import { ChangeEvent } from "react";
import { Input, InputProps, Button } from "@chakra-ui/react";
import { AiOutlineSearch } from "react-icons/ai";
import { LiaTimesSolid } from "react-icons/lia";
import { InputGroup } from "../ui/input-group";

type SearchInputProps = {
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onClear?: VoidFunction;
  placeholder?: string;
} & InputProps;

export const SearchInput = ({
  value,
  onChange,
  onClear,
  placeholder,
  ...inputProps
}: SearchInputProps) => {
  return (
    <InputGroup
      flex="1"
      startElement={<AiOutlineSearch />}
      endElementProps={{padding: 0}}
      endElement={
        !!value &&
        onClear && (
          <Button p={0} variant="plain" onClick={onClear}>
            <LiaTimesSolid style={{}} />
          </Button>
        )
      }
    >
      <Input
        placeholder={
          placeholder ?? "Type to search for any legislator name or bill title"
        }
        value={value}
        onChange={onChange}
        {...inputProps}
      />
    </InputGroup>
  );
};
