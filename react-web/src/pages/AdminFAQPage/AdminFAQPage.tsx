import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useUser } from '@hooks';
import { addFAQ, deleteFAQ, getFAQ, updateFAQ } from '@services/AdminServices';
import { AdminFAQLayout } from '@components/templates/AdminFAQLayout';
import { Modal } from '@components/organisms';
import { InputField } from '@components/organisms/ModalForm/ModalForm';

export type Question = {
  id: number;
  category: string;
  question: string;
  answer: string;
};

export const AdminFAQPage: React.FC = () => {
  const { t } = useTranslation();
  const { user } = useUser();

  const [faqData, setFaqData] = useState<Question[]>([]);
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(null);
  const [isModalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const fetchFAQData = async () => {
      try {
        const res = await getFAQ();
        if (res) setFaqData(res);
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

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => {
    setModalOpen(false);
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
      handleOpenModal();
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

  return (
    <div>
      {/* Layout principal contenant le tableau */}
      <AdminFAQLayout
        user={user}
        part={t('headers.faq')}
        data={faqData}
        addQuestionBtn={handleOpenModal}
        handleClickEdit={handleEditQuestion}
        handleClickDelete={handleDeleteQuestion}
      />

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        handleForm={selectedQuestion ? handleUpdateQuestion : handleAddQuestion}
        listInputs={listInputs}
        title={
          selectedQuestion
            ? t('modals.edit.faq')
            : t('modals.create.faq')
        }
      />
    </div>
  );
};
