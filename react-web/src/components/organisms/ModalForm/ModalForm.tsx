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
  value?: any | string;
  required?: boolean;
  disabled?: boolean;
  step?: string;
  options?: { id: number; name?: string; label?: string }[];
  optionsTags?: { id: number; label: string }[];
};

export type OptionTag = {
  id: number;
  label: string;
};

type ModalFormProps = {
  onSubmit: (formData: FormData) => void;
  listInputs: InputField[];
  listInputs2?: InputField[];
};

export const ModalForm: React.FC<ModalFormProps> = ({
  onSubmit,
  listInputs,
  listInputs2,
}) => {
  const { t } = useTranslation();

  const [selectedTags, setSelectedTags] = React.useState<{ id: number; label: string }[]>([]);
  const [file, setFile] = React.useState<File | null>(null);
  const [currentInputs, setCurrentInputs] = React.useState<InputField[]>(listInputs);
  const [formData, setFormData] = React.useState<Record<string, any>>({});

  useEffect(() => {
    const initialData: Record<string, any> = {};
    const combinedInputs = [...listInputs, ...(listInputs2 || [])];
  
    combinedInputs.forEach(input => {
      if (input.type === 'select') {
        initialData[input.name.toLowerCase()] = input.options?.find(option => option.id === input.value || option.name === input.value || option.label === input.value)?.id || '';
      } else if (input.type === 'autocomplete' && Array.isArray(input.value)) {
        // Pour autocomplete, stocker uniquement les IDs des tags
        initialData[input.name.toLowerCase()] = input.value.map((tag: { id: number; label: string }) => tag.id);
      } else if (input.type === 'number') {
        initialData[input.name.toLowerCase()] = input.value === 0 ? 0 : (Number(input.value) || '');      
      } else {
        initialData[input.name.toLowerCase()] = input.value || '';
      }
    });
    setFormData(initialData);
  }, [listInputs, listInputs2]);
  
  const handleTagChange = (name: string, value: { id: number; label: string }[]) => {
    setSelectedTags(value);
    // Stocker uniquement les IDs des tags dans formData
    setFormData(prev => ({
      ...prev,
      [name]: value.map(tag => tag.id), // Transforme en liste d'IDs
    }));
    console.log(formData);
  };
  
  const handleFileChange = (file: File) => {
    setFile(file);
  };
  
  const handleInputChange = (name: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };
  
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    //console.log(formData);
    const updatedFormData = new FormData();
    const combinedInputs = [...listInputs, ...(listInputs2 || [])];
  
    combinedInputs.forEach(input => {
      const fieldValue = formData[input.name.toLowerCase()];
      //console.log(input.name, fieldValue, Array.isArray(fieldValue));
      if (fieldValue && Array.isArray(fieldValue)) {
        fieldValue.forEach(value => {
          updatedFormData.append(input.name.toLowerCase(), value); 
        });
      } else if (fieldValue && typeof fieldValue === 'object') {
        updatedFormData.append(input.name.toLowerCase(), JSON.stringify(fieldValue));
      } else if (fieldValue !== undefined) {
        updatedFormData.append(input.name.toLowerCase(), fieldValue);
      } else {
        updatedFormData.append(input.name.toLowerCase(), '');
      }
    });
  
    // Si un fichier est sélectionné, on l'ajoute également
    updatedFormData.delete('photo_link');
    if (file) {
      updatedFormData.append('photo_link', file);
    }

    ['starter', 'main', 'drink', 'side', 'dessert', 'other'].forEach((key) => {
      if (updatedFormData.get(key) === '') {
        updatedFormData.delete(key);
      }
    });
  
    console.log("FormData avant soumission : ", Array.from(updatedFormData.entries()));
    onSubmit(updatedFormData);
  };
  

  const handleNext = () => {
    // Log de formData pour voir son contenu avant la mise à jour
    console.log(formData);
  
    // Combine listInputs et listInputs2
    const combinedInputs = [...listInputs, ...(listInputs2 || [])];
  
    // Crée un nouvel objet formData avec les nouvelles valeurs
    const updatedFormData: Record<string, any> = { ...formData };
  
    combinedInputs.forEach(input => {
      const inputElement = document.querySelector(`[name=${input.name.toLowerCase()}]`) as HTMLInputElement;
      if (inputElement) {
        // Ajoute les valeurs des inputs au formData
        updatedFormData[input.name.toLowerCase()] = inputElement.value;
      }
    });
  
    // Met à jour l'état avec les nouvelles valeurs
    setFormData(updatedFormData);
  
    // Gère les étapes suivantes
    if (listInputs2) {
      setCurrentInputs(listInputs2);
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
                key={input.name}
                name={input.name.toLowerCase()}
                label={input.label.toLowerCase()}
                value={input.value || []}
                options={input.optionsTags ?? []}
                onInputChange={handleTagChange}
              />
            );
          case 'select':
            return (
              <StyledSelect
                key={index}
                name={input.name.toLowerCase()}
                label={input.label.toLowerCase()}
                value={input.value || ''}
                options={input.options ?? []}
                icon={input.icon}
                onValueChange={(name, value) => handleInputChange(name, value)}
              />
            );
          case 'file':
            return (
              <FileInput
                key={index}
                id={index}
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
                  onChange={(event) => handleInputChange(input.name.toLowerCase(), event.target.checked)}
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
                value={formData[input.name.toLowerCase()] !== undefined ? formData[input.name.toLowerCase()] : ''}
                step={input.step}
                disabled={input.disabled ?? false}
                onInputChange={(name, value) => handleInputChange(name, value)}
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
