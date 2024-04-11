import { AllColumns, TableFilter, FilterOperator } from "@arkejs/table";
import { Button, Input, Popover, Select } from "@arkejs/ui";
import { FunnelIcon, PlusIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useCallback, useMemo, useState } from "react";

function Filters({
  onFiltersChange,
  allColumns,
  ...props
}: {
  allColumns: AllColumns;
  filters: TableFilter[];
  onFiltersChange: (filters: TableFilter[]) => void;
}) {
  const filterableColumns = useMemo(
    () =>
      allColumns.filter(
        (c) =>
          c.availableFilterOperators && c.availableFilterOperators.length > 0
      ),
    []
  );

  const initFilters = useMemo(
    () => ({
      key: filterableColumns[0]?.id,
      operator: filterableColumns[0]?.availableFilterOperators?.[0],
      value: "",
    }),
    [filterableColumns]
  );

  const [filters, setFilters] = useState<Partial<TableFilter>[]>(
    props.filters.length > 0 ? props.filters : [initFilters]
  );

  const onColumnChange = useCallback(
    (index: number, key: string) => {
      const newFilters = [...filters];
      newFilters[index] = { ...newFilters[index], key };
      setFilters(newFilters);
    },
    [filters]
  );

  const onOperatorChange = useCallback(
    (index: number, operator: FilterOperator) => {
      const newFilters = [...filters];
      newFilters[index] = { ...newFilters[index], operator };
      setFilters(newFilters);
    },
    [filters]
  );

  const onValueChange = useCallback(
    (index: number, value: string) => {
      const newFilters = [...filters];
      newFilters[index] = { ...newFilters[index], value };
      setFilters(newFilters);
    },
    [filters]
  );

  const onRemoveFilter = useCallback(
    (index: number) => {
      const newFilters = [...filters];
      newFilters.splice(index, 1);
      setFilters(newFilters);
    },
    [filters]
  );

  return (
    <Popover
      popover={
        <div className="rounded-theme-sm bg-background p-4 shadow-md">
          <div>
            {filters.map((f, index) => (
              <div key={index} className="mt-2 flex items-end gap-4">
                <Button
                  disabled={filters.length <= 1}
                  onClick={() => onRemoveFilter(index)}
                >
                  <XMarkIcon className="h-4 w-4" />
                </Button>
                <Select
                  label="Colonna"
                  value={filterableColumns.find((c) => c.id === f.key)}
                  onChange={(val) => onColumnChange(index, val.id)}
                  values={filterableColumns}
                  renderValue={(val) => val.label}
                  renderOption={(val) => val.label}
                />
                <Select
                  value={f.operator}
                  label="Operatore"
                  onChange={(val) => onOperatorChange(index, val)}
                  renderValue={(c) => c}
                  renderOption={(c) => c}
                  values={
                    filterableColumns.find((c) => c.id === f.key)
                      ?.availableFilterOperators
                  }
                />
                <Input
                  label="Valore"
                  value={f.value as string | number}
                  onChange={(event) => onValueChange(index, event.target.value)}
                  type={typeof f.value === "number" ? "number" : "text"}
                />
              </div>
            ))}
          </div>
          <div className="mt-4 flex items-center gap-4">
            <Button
              color="primary"
              onClick={() =>
                setFilters((prevState) => [...prevState, initFilters])
              }
            >
              Aggiungi <PlusIcon className="ml-2 w-4" />
            </Button>
            <Button
              color="primary"
              onClick={() => {
                onFiltersChange([]);
                setFilters([initFilters]);
              }}
            >
              Reset <XMarkIcon className="ml-2 w-4" />
            </Button>
            <Button
              className="ml-auto"
              color="primary"
              onClick={() => onFiltersChange(filters as TableFilter[])}
            >
              Applica
            </Button>
          </div>
        </div>
      }
    >
      <FunnelIcon className="h-4 w-4" />
    </Popover>
  );
}

export default Filters;
