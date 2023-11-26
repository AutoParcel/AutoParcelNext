import React from "react";

export default function ParcelPage({ params }: { params: { id: string } }) {
  return <div>{params.id}</div>;
}
