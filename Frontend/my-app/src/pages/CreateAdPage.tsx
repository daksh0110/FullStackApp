import CreateAdForm from "../components/createForm/CreateForm";
import Header from "../components/Header/Header";
import { useTranslation } from "react-i18next"; // Import t function for translations

const CreateAdPage = () => {
  const { t } = useTranslation(); // Initialize t function for translations

  return (
    <>
      <Header />
      <h1>{t('createAdPage.title')}</h1> {/* Translated page title */}
      <CreateAdForm />
    </>
  );
};

export default CreateAdPage;
