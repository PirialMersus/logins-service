import React, { ChangeEvent, useCallback, useState } from 'react';

export interface DropdownItem<T = string> {
  id: T;
  name: string;
}

export const isDropDownField = (value: unknown): value is DropdownItem => {
  return typeof value === 'object' && value !== null && !!(value as DropdownItem).id;
};

export interface IUseForm<T> {
  form: T;
  clear(): void;
  setInitial: React.Dispatch<React.SetStateAction<T>>;
  inValidateFields<TData extends Record<string, unknown>>(): TData;
  isNotEmpty(value: unknown): boolean;
  handleGroupedButtonsChange(field: keyof T, value: string | number): void;
  handleSwitcherChange(field: keyof T, value: unknown): void;
  handleTextFiledChange(event: React.ChangeEvent<HTMLInputElement>): void;
  handleCheckboxChange(event: React.ChangeEvent<HTMLInputElement>): void;
  handleDropDownChange(field: keyof T, newValue: DropdownItem | null): void;
  handleChipChange(field: keyof T, value: DropdownItem[]): void;
}

export const useForm = <T>(initial: T): IUseForm<T> => {
  const [form, setForm] = useState<T>(initial);

  const handleDropDownChange = useCallback((field: keyof T, newValue: DropdownItem | null) => {
    setForm((prevState) => ({ ...prevState, [field]: newValue }));
  }, []);

  const handleTextFiledChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setForm((prevState) => ({ ...prevState, [name]: value }));
  }, []);

  const handleChipChange = useCallback(
    (field: keyof T, value: DropdownItem[]) => {
      const filterValue = form[field];
      if (!Array.isArray(filterValue)) throw new Error(`Property ${field.toString()} should be array only!`);
      setForm((prevState) => ({ ...prevState, [field]: value }));
    },
    [form]
  );

  const handleGroupedButtonsChange = useCallback(
    (field: keyof T, value: string | number) => {
      const filterValue = form[field];

      if (!Array.isArray(filterValue)) throw new Error(`Property ${field.toString()} should be array only!`);

      if (filterValue.includes(value)) {
        setForm((prevState) => ({
          ...prevState,
          [field]: filterValue.filter((v) => v !== value),
        }));
      } else {
        setForm((prevState) => ({ ...prevState, [field]: [...filterValue, value] }));
      }
    },
    [form]
  );

  const handleCheckboxChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    setForm((prevState) => ({ ...prevState, [name]: checked }));
  }, []);

  const handleSwitcherChange = useCallback((name: keyof T, value: unknown) => {
    setForm((prevState) => ({ ...prevState, [name]: value }));
  }, []);

  const isNotEmpty = (value: unknown): boolean => {
    if (typeof value === 'string') return value !== '';
    if (typeof value === 'number') return true;
    if (typeof value === 'boolean') return true;
    if (Array.isArray(value)) return value.length > 0;
    return !!isDropDownField(value);
  };

  const inValidateFields = <TData extends Record<string, unknown>>(): TData => {
    const fields: Record<string, unknown> = {};
    Object.entries(form)
      .filter(([_key, value]) => isNotEmpty(value))
      .forEach(([key, value]) => {
        if (Array.isArray(value)) {
          fields[key] = value.map((item) => (isDropDownField(item) ? item.id : item));
        } else if (isDropDownField(value)) fields[key] = value.id;
        else fields[key] = value;
      });

    return fields as TData;
  };

  const clear = useCallback(() => {
    setForm(initial);
  }, []);

  return {
    form,
    clear,
    isNotEmpty,
    inValidateFields,
    setInitial: setForm,
    handleDropDownChange,
    handleChipChange,
    handleCheckboxChange,
    handleSwitcherChange,
    handleTextFiledChange,
    handleGroupedButtonsChange,
  };
};
