import { Input } from '@components';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, IconProps } from '@components/atoms';
import { AutoCompleteInput, CustomSwitch, FileInput, StyledSelect } from '@components/molecules';
import { Typography } from '@mui/material';

export type InputField = {
  name: string;
  label: string;
  type: string;
  icon: IconProps['name'];
  value?: any | string[];
  required?: boolean;
  disabled?: boolean;
  step?: string;
  options?: { tag: string }[];
  optionsTags?: { tag_id: number; tag_label: string }[];
};

type ModalFormProps = {
  onSubmit: (formData: FormData) => void;
  listInputs: InputField[];
  listInputs2?: InputField[]; // listInputs2 est maintenant optionnel
};

export const ModalForm: React.FC<ModalFormProps> = ({
  onSubmit,
  listInputs,
  listInputs2,
}) => {
  const { t } = useTranslation();

  const [selectedTags, setSelectedTags] = React.useState<{ tag_id: number; tag_label: string }[]>([]);
  const [file, setFile] = React.useState<File | null>(null);
  const [currentInputs, setCurrentInputs] = React.useState<InputField[]>(listInputs); // Liste des inputs à afficher
  const [formData, setFormData] = React.useState<FormData>(new FormData()); // Stocke les données du formulaire

  const handleTagChange = (name: string, value: { tag_id: number; tag_label: string }[]) => {
    setSelectedTags(value);
  };

  const handleFileChange = (file: File) => {
    console.log(file.name);
    setFile(file);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    // Ajouter les tags et le fichier dans le FormData
    const updatedFormData = new FormData(event.currentTarget);
    if (selectedTags.length > 0) {
      updatedFormData.delete('tags');
      updatedFormData.append('tags', JSON.stringify(selectedTags));
    }  
    if (file) {
      updatedFormData.append('photo_link', file);
    }

    console.log("FormData avant soumission : ", Array.from(updatedFormData.entries()));
    onSubmit(updatedFormData);
  };

  // Gérer l'initialisation des tags si un champ 'autocomplete' est défini
  useEffect(() => {
    const inputField = listInputs.find(input => input.type === 'autocomplete');
    if (inputField?.value) {
      setSelectedTags(inputField.value);
    }
  }, [listInputs]);

  const handleNext = () => {
    // Ajouter les données de la première liste dans formData
    const updatedFormData = new FormData();
    listInputs.forEach(input => {
      const inputElement = document.querySelector(`[name=${input.name.toLowerCase()}]`) as HTMLInputElement;
      if (inputElement) updatedFormData.append(input.name, inputElement.value);
    });
    setFormData(updatedFormData);

    // Si listInputs2 est définie, afficher la deuxième liste d'inputs
    if (listInputs2) {
      setCurrentInputs(listInputs2);
    } else {
      // Si on est à la fin, soumettre le formulaire
      onSubmit(updatedFormData);
    }
  };

  return (
    <form className="flex flex-col space-y-4 justify-center items-center" 
      onSubmit={handleSubmit} 
      id="AccountForm" 
      method="POST"
      style={{ padding: "20px 40px" }}>
      
      {currentInputs.map((input, index) => {
        switch (input.type) {
          case 'autocomplete':
            return (
              <AutoCompleteInput
                key={index}
                name={input.name.toLowerCase()}
                label={input.label.toLowerCase()}
                {...(input.value && { value: input.value })}
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
                {...(input.value && { value: input.value })}
                options={input.options ?? []}
                icon={input.icon}
                onValueChange={(name, value) => console.log(`${name}: ${value}`)}
              />
            );
          case 'file':
            return (
              <FileInput
                value={input.value}
                onFileChange={handleFileChange}
              />
            );
          case 'switch':
            return (
              <div style={{ display: "flex", gap: "10px" }}>
                <Typography>{input.label.toLowerCase()}</Typography>
                <CustomSwitch
                  name={input.name.toLowerCase()}
                  checked={input.value}
                />
              </div>
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
                value={input.value || ''}
                step={input.step}
                disabled={input.disabled ?? false}
                onInputChange={(name, value) => console.log(`${name}: ${value}`)}
              />
            );
        }
      })}

      {listInputs2 && currentInputs !== listInputs2 && (
        <Button
          title={t('buttons.actions.continue')}
          type="button"
          onclick={handleNext}
        />
      )}
      
      {(!listInputs2 || currentInputs === listInputs2) && (
        <Button
          title={t('buttons.actions.save')}
          type="submit"
        />
      )}
    </form>
  );
};
