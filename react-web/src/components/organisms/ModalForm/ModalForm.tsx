import { Input } from '@components';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, IconProps } from '@components/atoms';
import { AutoCompleteInput, FileInput, StyledSelect } from '@components/molecules';

export type InputField = {
  name: string;
  label: string;
  type: string;
  icon: IconProps['name'];
  value?: any | string[];
  required?: boolean;
  disabled?: boolean;
  step? : string;
  options?: { tag: string }[];
  optionsTags? : { tag_id: number; tag_label: string }[];
};

type ModalFormProps = {
  onSubmit: (formData: FormData) => void;
  listInputs: InputField[];
};

export const ModalForm: React.FC<ModalFormProps> = ({
  onSubmit,
  listInputs
}) => {
  const { t } = useTranslation();

  const [selectedTags, setSelectedTags] = React.useState<{ tag_id: number; tag_label: string }[]>([]);
  const handleTagChange = (name: string, value: { tag_id: number; tag_label: string }[]) => {
    setSelectedTags(value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const formData = new FormData(event.currentTarget);
    if (selectedTags.length > 0) {
      formData.delete('tags');
      formData.append('tags', JSON.stringify(selectedTags));
    }  
    console.log("FormData avant soumission : ", Array.from(formData.entries()));
    onSubmit(formData);
  };

  useEffect(() => {
    const inputField = listInputs.find(input => input.type === 'autocomplete');
    if (inputField?.value) {
      setSelectedTags(inputField.value);
    }
  }, [listInputs]); 

  return (
    <form className="flex flex-col space-y-4 justify-center items-center" 
      onSubmit={handleSubmit} 
      id="AccountForm" 
      style={{ 
        padding: "20px 40px",
      }}>
      {listInputs.map((input, index) => {
        switch (input.type) {
          case 'autocomplete':
            return (
              <AutoCompleteInput
                key={index}
                name={input.name.toLowerCase()}
                label={input.label.toLowerCase()}
                {...(input.value && { value: input.value})}
                options={input.optionsTags ?? []}
                onInputChange={(name, value) => handleTagChange(name, value)}
              />
            );
          case 'select':
            return (
              <StyledSelect
                key={index}
                name={input.name.toLowerCase()}
                label={input.label.toLowerCase()}
                {...(input.value && { value: input.value})}
                options={input.options ?? []}
                icon={input.icon}
              />
            );
          case 'file':
            return (
              <FileInput
              />
            );
          default:
            return (
              <Input
                key={index}
                icon={input.icon}
                name={input.name.toLowerCase()}
                label={input.label.toLowerCase()}
                required={input.required ?? false}
                type={input.type}
                {...(input.value && { defaultvalue: input.value })}
                step={input.step}
                disabled={input.disabled ?? false}
                onInputChange={(name, value) => console.log(`${name}: ${value}`)}
              />
            );
        }
      })}

      <Button title={t('modals.create.addaccount')} type="submit" onclick={() => {}} />
    </form>
  );
}
