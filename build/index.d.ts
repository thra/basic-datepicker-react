import { Dispatch, SetStateAction } from 'react';

type DatepickerProps = {
    locale?: string;
    theme?: string;
    setInputValue: Dispatch<SetStateAction<string>> | ((value: Date | string | number, name?: string) => void);
    RHFinputName?: string;
    currentSelectedValue?: string;
    disableFuture?: boolean;
    hide: () => void;
};
declare const Datepicker: ({ locale, theme, setInputValue, RHFinputName, currentSelectedValue, disableFuture, hide }: DatepickerProps) => JSX.Element;

export { Datepicker };
