import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useUser } from '@hooks';
import { addFAQ, addNetwork, deleteFAQ, deleteNetwork, getFAQ, getNetworks, updateFAQ, updateNetwork } from '@services/AdminServices';
import { AdminFAQLayout } from '@components/templates/AdminFAQLayout';
import { Modal } from '@components/organisms';
import { InputField } from '@components/organisms/ModalForm/ModalForm';

export type Question = {
  id: number;
  category: string;
  question: string;
  answer: string;
};

export type Networks = {
  id: number;
  type: string;
  link_network: string;
};

export const AdminFAQPage: React.FC = () => {
  const { t } = useTranslation();
  const { user } = useUser();

  const [faqData, setFaqData] = useState<Question[]>([]);
  const [networksData, setNetworksData] = useState<Networks[]>([]);
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [availableOptions, setAvailableOptions] = useState<{ id: number; label: string }[]>([]);
  const [openModal, setOpenModal] = useState<string | null>(null);

  useEffect(() => {
    const fetchFAQData = async () => {
      try {
        const res = await getFAQ();
        if (res) setFaqData(res);
        const res2 = await getNetworks();
        if (res2) {
          setNetworksData(res2.networks);
          setAvailableOptions(res2.available_types);
        }
      } catch (error) {
        console.error('Erreur lors du chargement des FAQ:', error);
      }
    };

    fetchFAQData();
  }, []);

  const listInputs: InputField[] = [
    {
      name: 'category',
      label: t('fields.common.category'),
      type: 'text',
      icon: 'Box',
      value: selectedQuestion?.category,
      required: true,
    },
    {
      name: 'question',
      label: t('tables.headers.faq.question'),
      type: 'text',
      icon: 'Box',
      value: selectedQuestion?.question,
      required: true,
    },
    {
      name: 'answer',
      label: t('tables.headers.faq.answer'),
      type: 'textarea',
      icon: 'Box',
      value: selectedQuestion?.answer,
      required: true,
    },
  ];

  const listInputs2: InputField[] = [
    {
      name: 'type',
      label: t('fields.common.type'),
      type: 'select',
      icon: 'Box',
      options : availableOptions ?? [],
      required: true,
    },
    {
      name: 'link_network',
      label: t('fields.common.link'),
      type: 'text',
      icon: 'Box',
      required: true,
    }
  ];

  const handleOpenModal = (modalType: string) => {
    setOpenModal(modalType);
  };

  const handleCloseModal = () => {
    setOpenModal(null);
    setSelectedQuestion(null); // Réinitialise la question sélectionnée
  };

  const handleAddQuestion = async (formData: FormData) => {
    try {
      const res = await addFAQ(formData);
      setFaqData(res);
      handleCloseModal();
    } catch (error) {
      console.error('Erreur lors de l’ajout de la FAQ :', error);
    }
  };

  const handleEditQuestion = (id: number) => {
    const questionToEdit = faqData.find((faq) => faq.id === id);
    if (questionToEdit) {
      setSelectedQuestion(questionToEdit); // Pré-sélection de la question
      handleOpenModal("createFAQ");
    }
  };

  const handleUpdateQuestion = async (formData: FormData) => {
    if (!selectedQuestion) return;
    formData.append('id', String(selectedQuestion.id)); // Ajout de l'ID de la question
    try {
      const res = await updateFAQ(formData);
      setFaqData(res);
      handleCloseModal();
    } catch (error) {
      console.error('Erreur lors de la mise à jour de la FAQ :', error);
    }
  };

  
  const handleDeleteQuestion = async (id: number) => {
    try {
      const res = await deleteFAQ(id);
      setFaqData(res);
    } catch (error) {
      console.error('Erreur lors de la suppression de la FAQ :', error);
    }
  };

  const addNetworkModal = () => {
    handleOpenModal("createNetwork");
  };

  const addFAQModal = () => {
    handleOpenModal("createFAQ");
  };

  const handleUpdateNetwork = async (id: number, link_network: string): Promise<void> => {
    try {
      const res = await updateNetwork(id,link_network);
      setNetworksData(res.networks);
      setAvailableOptions(res.available_types);
      handleCloseModal();
    } catch (error) {
      console.error('Erreur lors de la mise à jour de la FAQ :', error);
    }
  };

  const handleDeleteNetwork = async (id: number): Promise<void> => {
    try {
      const res = await deleteNetwork(id);
      setNetworksData(res.networks);
      setAvailableOptions(res.available_types);
    } catch (error) {
      console.error('Erreur lors de la suppression de la FAQ :', error);
    }
  };
  

  const handleAddNetwork = async (formData: FormData): Promise<void> => {
    try {
      const res = await addNetwork(formData);
      setNetworksData(res.networks);
      setAvailableOptions(res.available_types);
      handleCloseModal();
    } catch (error) {
      console.error('Erreur lors de la suppression de la FAQ :', error);
    }
  }

  return (
    <div>
      {/* Layout principal contenant le tableau */}
      <AdminFAQLayout
        user={user}
        part={t('headers.faq')}
        data={faqData}
        dataNetworks={networksData}
        availableOptions={availableOptions}
        addQuestionBtn={addFAQModal}
        handleClickEdit={handleEditQuestion}
        handleClickDelete={handleDeleteQuestion}
        addNetworkBtn={addNetworkModal}
        handleUpdateNetwork={handleUpdateNetwork}
        handleDeleteNetwork={handleDeleteNetwork}
      />

      <Modal
        isOpen={openModal === 'createFAQ'}
        onClose={handleCloseModal}
        handleForm={selectedQuestion ? handleUpdateQuestion : handleAddQuestion}
        listInputs={listInputs}
        title={
          selectedQuestion
            ? t('modals.edit.faq')
            : t('modals.create.faq')
        }
      />

      <Modal
        isOpen={openModal === 'createNetwork'}
        onClose={handleCloseModal}
        handleForm={handleAddNetwork}
        listInputs={listInputs2}
        title={t('modals.create.network')}
      />
    </div>
  );
};
