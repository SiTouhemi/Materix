import { Loader } from "@/components/loader";
import { NoDataFound } from "@/components/no-data-found";
import { useGetWorkspacesQuery } from "@/hooks/use-workspace";
import { useSearchParams } from "react-router";

const Archived = () => {
  const [searchParams] = useSearchParams();
  const workspaceId = searchParams.get("workspaceId");

  const { data: workspaces, isPending } = useGetWorkspacesQuery();

  if (isPending) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader />
      </div>
    );
  }

  if (!workspaceId) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-600 mb-2">No Workspace Selected</h2>
          <p className="text-gray-500">Please select a workspace to view archived items.</p>
        </div>
      </div>
    );
  }

  // For now, show a placeholder since we need to implement archived projects/tasks API
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Archived</h1>
      </div>

      <div className="grid gap-6">
        <div className="rounded-lg border bg-card p-6">
          <h3 className="text-lg font-semibold mb-4">Archived Projects</h3>
          <NoDataFound 
            title="No Archived Projects"
            description="Archived projects will appear here when you archive them."
            buttonText="Create Project"
            buttonAction={() => {}}
          />
        </div>

        <div className="rounded-lg border bg-card p-6">
          <h3 className="text-lg font-semibold mb-4">Archived Tasks</h3>
          <NoDataFound 
            title="No Archived Tasks"
            description="Archived tasks will appear here when you archive them."
            buttonText="Create Task"
            buttonAction={() => {}}
          />
        </div>
      </div>
    </div>
  );
};

export default Archived; 