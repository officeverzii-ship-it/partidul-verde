import { createFileRoute } from "@tanstack/react-router";
import { CrudPage } from "@/components/admin/CrudPage";

export const Route = createFileRoute("/_authenticated/admin/branches")({
  component: () => (
    <CrudPage
      title="Filiale"
      table="branches"
      section="branches"
      searchField="city"
      fields={[
        { name: "name", label: "Nume", required: true, inList: true },
        { name: "city", label: "Oraș", required: true, inList: true },
        { name: "county", label: "Județ", required: true, inList: true },
        { name: "coordinator", label: "Coordonator", inList: true },
        { name: "address", label: "Adresă" },
      ]}
    />
  ),
});
