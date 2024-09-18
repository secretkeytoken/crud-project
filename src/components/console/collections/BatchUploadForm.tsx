import React from "react";
type Props = {
  collectionId: number;
};
const BatchUploadForm: React.FC<Props> = ({ collectionId }) => {
  return <div>BatchUploadForm {collectionId}</div>;
};

export default BatchUploadForm;
