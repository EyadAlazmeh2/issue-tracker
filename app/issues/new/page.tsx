import dynamic from "next/dynamic";
import LoadingForm from "./loading";

const IssueForm = dynamic(() => import("@/app/issues/_components/IssueForm"), {
  ssr: false,
  loading: () => <LoadingForm />,
});

const NewIssuePage = () => {
  return <IssueForm />;
};

export default NewIssuePage;
