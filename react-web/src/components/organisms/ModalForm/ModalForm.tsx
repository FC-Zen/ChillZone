import { Input } from '@components';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button, IconProps } from '@components/atoms';

export type InputField = {
  name: string;
  type: string;
  icon: IconProps['name'];
  required: boolean;
};

type ModalFormProps = {
  addAccount: (event: React.FormEvent<HTMLFormElement>) => void;
  listInputs: InputField[];
};

export const ModalForm: React.FC<ModalFormProps> = ({
  addAccount,
  listInputs
}) => {
  const { t } = useTranslation();

  return (
    <form className="flex flex-col space-y-4 justify-center items-center" onSubmit={addAccount} id="AccountForm" style={{ paddingHorizontal: "66px" }}>
      {listInputs.map((input, index) => (
        //Switch case sur l'input.type pour afficher le bon type d'input
        <Input
          key={index}
          icon={input.icon}
          name={input.name.toLowerCase()}
          label={input.name.toLowerCase()}
          required={input.required}
          type={input.type}
          onInputChange={(name, value) => console.log(`${name}: ${value}`)}
        />
      ))}
      <Button title={t('modals.create.addaccount')} type="submit" onclick={() => {}} />
    </form>
  );
}
