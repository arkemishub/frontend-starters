import {
  Table as ArkeTable,
  ITableProps,
  IUseTableData,
  Filter,
  Sort,
} from "@arkejs/table";
import Pagination from "./Pagination/Pagination";
import Filters from "@/components/Table/Filters/Filters";

function Table(
  props: Pick<ITableProps, "columns" | "data" | "actions" | "noResult"> &
    Omit<IUseTableData<any, any>, "tableProps"> & {
      onFiltersChange?: (filters: Filter[]) => void;
      onSortChange?: (sort: Sort[]) => void;
    }
) {
  return (
    <>
      <div className="flex justify-end">
        {props.allColumns.some(
          (col) => (col?.availableFilterOperators?.length ?? 0) > 0
        ) && (
          <Filters
            allColumns={props.allColumns}
            filters={props.filters}
            onFiltersChange={(filters) => props.onFiltersChange?.(filters)}
          />
        )}
      </div>
      <ArkeTable {...props} setSort={(sort) => props.onSortChange?.(sort)} />
      <Pagination
        onChange={props.goToPage}
        currentPage={props.currentPage}
        pageCount={props.pageCount}
        totalCount={props.totalCount ?? 0}
      />
    </>
  );
}

export default Table;
