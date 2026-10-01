import { createFileRoute } from "@tanstack/react-router";
import { CrudPage, useBranchOptions } from "@/components/admin/CrudPage";

export const Route = createFileRoute("/_authenticated/admin/members")({
  component: MembersAdmin,
});

function MembersAdmin() {
  const { data: branches = [] } = useBranchOptions();
  return (
    <CrudPage
      title="Membri"
      table="members"
      section="members"
      searchField="full_name"
      fields={[
        { name: "full_name", label: "Nume", required: true, inList: true },
        { name: "email", label: "Email", type: "email", required: true, inList: true },
        { name: "phone", label: "Telefon", inList: true },
        { name: "branch_id", label: "Filială", type: "select", options: branches, inList: true },
        { name: "role", label: "Rol în partid", required: true },
        { name: "status", label: "Status", type: "select", required: true, inList: true, options: [
          { value: "in_asteptare", label: "În așteptare" }, { value: "activ", label: "Activ" }, { value: "suspendat", label: "Suspendat" }, { value: "retras", label: "Retras" },
        ] },
        { name: "joined_at", label: "Data înscrierii", type: "date", inList: true },
        { name: "dues_paid", label: "Cotizații plătite (lei)", type: "number" },
        { name: "address", label: "Adresă" },
      ]}
    />
  );
}
