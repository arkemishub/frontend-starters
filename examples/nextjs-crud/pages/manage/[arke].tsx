import { Filter, Sort, useTable } from "@arkejs/table";
import useClient from "@/arke/useClient";
import React, { useCallback, useEffect, useState } from "react";
import { Client, TStruct, TUnit } from "@arkejs/client";
import { CrudAddEdit, CrudDelete } from "@/components/Crud";
import { CrudState } from "@/types/crud";
import { Button } from "@arkejs/ui";
import { PencilIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { getClient } from "@/arke/getClient";
import { GetServerSideProps } from "next";
import { withAuth } from "@/server/withAuth";
import { Table } from "@/components/Table";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

const PAGE_SIZE = 10;

const fetchUnits = async (
  client: Client,
  arke: string,
  page?: number,
  filters?: Filter[],
  sort?: Sort[]
) => {
  return client.unit.getAll(arke, {
    params: {
      filter:
        filters && filters?.length > 0
          ? `and(${filters.map(
              (f) => `${f.operator}(${f.columnId},${f.value})`
            )})`
          : null,
      offset: (page ?? 0) * PAGE_SIZE,
      limit: PAGE_SIZE,
      order: sort?.map((sort) => `${sort.columnId};${sort.type}`),
    },
  });
};

export default function ManageArke(props: {
  data: TUnit[];
  count: number;
  arkeInfo: TUnit;
  arkeStruct: TStruct;
}) {
  const client = useClient();
  const { query } = useRouter();
  const arke = String(query.arke);
  const arkeInfo = props.arkeStruct;
  const [data, setData] = useState<TUnit[] | undefined>(props.data);
  const [count, setCount] = useState<number | undefined>(props.count);
  const [isLoading, setIsLoading] = useState(false);
  const [crud, setCrud] = useState<CrudState>({
    add: false,
    edit: false,
    delete: false,
  });

  const {
    setFilters,
    tableProps,
    totalCount,
    setSort,
    filters,
    goToPage,
    currentPage,
  } = useTable(
    // TODO: check the mismatch between @arkejs/client and @arkejs/table
    // @ts-ignore
    typeof count !== "undefined"
      ? {
          pagination: {
            totalCount: count,
            type: "custom",
            pageSize: PAGE_SIZE,
          },
          columns: props.arkeStruct.parameters,
          sorting: {
            sortable: true,
          },
        }
      : null
  );

  const loadData = useCallback(
    (page?: number, filters?: Filter[], sort?: Sort[]) => {
      setIsLoading(true);
      fetchUnits(client, arke, page, filters, sort).then((res) => {
        setIsLoading(false);
        setData(res.data.content.items);
        setCount(res.data.content.count);
      });
    },
    []
  );

  return (
    <div className="p-16 min-h-screen max-w-5xl mx-auto">
      <h1 className="mb-6 text-3xl font-bold">Manage {arkeInfo.label}</h1>
      <Button
        color="primary"
        onClick={() => setCrud((prevState) => ({ ...prevState, add: true }))}
      >
        Add {arkeInfo.label}
      </Button>

      {data && !isLoading && (
        <>
          <Table
            data={data}
            actions={{
              label: "Actions",
              actions: [
                {
                  content: (
                    <div className="p-4">
                      <PencilIcon className="h-4 w-4" />
                    </div>
                  ),
                  onClick: (rowData) =>
                    setCrud((prevState) => ({
                      ...prevState,
                      edit: rowData?.id as string,
                    })),
                },
                {
                  content: (
                    <div className="p-4">
                      <XMarkIcon className="h-4 w-4" />
                    </div>
                  ),
                  onClick: (rowData) =>
                    setCrud((prevState) => ({
                      ...prevState,
                      delete: rowData?.id as string,
                    })),
                },
              ],
            }}
            {...tableProps}
            goToPage={(page) => {
              goToPage(page);
              loadData(page);
            }}
            onFiltersChange={(filters) => {
              setFilters(filters);
              loadData(currentPage, filters);
            }}
            onSortChange={(sort) => {
              setSort(sort);
              loadData(currentPage, filters, sort);
            }}
            noResult={"No result found"}
            totalCount={totalCount}
          />
        </>
      )}
      <CrudAddEdit
        title={
          <div className="flex items-center gap-4">Add {arkeInfo.label}</div>
        }
        open={!!crud.add}
        arke={arke}
        onClose={() => setCrud((p) => ({ ...p, add: false }))}
        onSubmit={() => {
          loadData();
          toast.success(`Added correctly`);
          setCrud((p) => ({ ...p, add: false }));
        }}
      />
      <CrudAddEdit
        title={
          <div className="flex items-center gap-4">Edit {arkeInfo.label}</div>
        }
        open={!!crud.edit}
        arke={arke}
        onClose={() => setCrud((p) => ({ ...p, edit: false }))}
        onSubmit={() => {
          loadData();
          toast.success(`Edited correctly`);
          setCrud((p) => ({ ...p, edit: false }));
        }}
      />
      <CrudDelete
        arke={arke}
        title={`Delete ${arkeInfo.label}`}
        open={crud.delete}
        id={crud.delete as string}
        onClose={() => setCrud((p) => ({ ...p, delete: false }))}
        onSubmit={() => {
          loadData();
          toast.success(`Deleted correctly`);
          setCrud((p) => ({ ...p, delete: false }));
        }}
      />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = withAuth(
  async (context) => {
    const client = getClient(context);
    const arke = String(context.query.arke);
    const response = await fetchUnits(client, arke);
    const responseArkeInfo = await client.arke.get(arke);
    const exclude = [
      "id",
      "active",
      "arke_id",
      "type",
      "metadata",
      "inserted_at",
      "updated_at",
      "parameters",
    ];
    const responseArkeStruct = await client.arke.struct(arke, {
      params: { exclude },
    });
    return {
      props: {
        data: response.data.content.items,
        count: response.data.content.count,
        arkeInfo: responseArkeInfo.data.content,
        arkeStruct: responseArkeStruct.data.content,
      },
    };
  }
);
