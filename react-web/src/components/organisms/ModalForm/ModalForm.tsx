import { Input } from '@components';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button, IconProps } from '@components/atoms';
import { AutoCompleteInput, FileInput } from '@components/molecules';

export type InputField = {
  name: string;
  label: string;
  type: string;
  icon: IconProps['name'];
  required?: boolean;
  disabled?: boolean;
  step? : string;
  options?: { tag: string }[];
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

  const [selectedTags, setSelectedTags] = React.useState<string[]>([]);
  const handleTagChange = (name: string, value: string[]) => {
    setSelectedTags(value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const formData = new FormData(event.currentTarget);
    const tagsString = selectedTags.join(',');
    if (tagsString) {
      formData.delete('tags');
      formData.append('tags', tagsString);
    }
    console.log("FormData avant soumission : ", Array.from(formData.entries()));
    onSubmit(formData);
  };


  return (
    <form className="flex flex-col space-y-4 justify-center items-center" onSubmit={handleSubmit} id="AccountForm" style={{ paddingLeft: "40px", paddingRight: "40px" }}>
      {listInputs.map((input, index) => {
        switch (input.type) {
          case 'autocomplete':
            return (
              <AutoCompleteInput
                key={index}
                name={input.name.toLowerCase()}
                label={input.label.toLowerCase()}
                options={input.options ?? []}
                onInputChange={(name, value) => handleTagChange(name, value)}
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
