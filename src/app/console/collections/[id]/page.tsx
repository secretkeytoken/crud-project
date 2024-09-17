import React from "react";
type Props = {
  params: {
    id: string;
  };
};
const CollectionDetailPage: React.FC<Props> = ({ params: { id } }) => {
  return <div>CollectionDetailPage {id}</div>;
};

export default CollectionDetailPage;
