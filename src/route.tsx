// import { useGetInterviewAllList } from "@hooks/query/interview";
// import { useMyInfoQuery } from "@hooks/query/user";
// import SignInPage from "@pages/sign-in";
// import {
//   LOCAL_STORAGE_KEYS,
//   SESSION_STORAGE_KEYS,
// } from "@shared/constant/storage";
// import SideBar from "component/feature/side-bar";
// import { useEffect, useState } from "react";
// import {
//   createBrowserRouter,
//   Navigate,
//   Outlet,
//   useLocation,
//   useNavigate,
// } from "react-router-dom";
// import { useUserStore } from "stores/user";
// import { useShallow } from "zustand/react/shallow";
// import dayjs from "dayjs";
// import { setDDUser } from "@shared/lib/rum";
// import ModalManager from "component/molecules/modal";
// import { Toaster } from "component/molecules/toast/toaster";
// import ResultPage from "@pages/result";
// import HomePage from "@pages/main";
// import MonitoringPage from "@pages/monitoring";
// import DataSettingPage from "@pages/data-setting";
// import OfficePage from "@pages/office";
// import ApplicantListPage from "@pages/applicant-list";
// import ProfilePage from "@pages/profile";
// import PrivacyPolicyPage from "@pages/privacy-policy";
// import InterviewDetailPage from "@pages/interview-detail";
// import InterviewOutsideStatus from "component/feature/interview/outer-interview";
// import UseWorkspaceSocket from "@hooks/custom/use-workspace-socket";
// import UseNetworkStatus from "@hooks/custom/use-nework-status";
// import { SOLUTION } from "@shared/constant/data";
// import UseVADState from "@hooks/custom/use-vad";
// import UseMicrophonePermission from "@hooks/custom/user-microphone-permission";
// // import AssignmentAdminPage from "@component/feature/assignment/admin";
// // import AssignmentViewPage from "@component/feature/assignment/volunteer";
// import AssignmentPage from "@pages/assignment";

// export default function ProtectedRoute() {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const isAuthenticated =
//     typeof window !== "undefined" &&
//     localStorage.getItem(LOCAL_STORAGE_KEYS.token) !== null;
//   useEffect(() => {
//     if (!isAuthenticated && location.pathname !== "/sign-in") {
//       navigate("/sign-in", { replace: true });
//     }
//   }, [isAuthenticated, location.pathname, navigate]);
//   if (!isAuthenticated) return null;

//   const { data } = useMyInfoQuery();
//   const [workspaceId, setWorkspaceId] = useState("");
//   const { setMyInfo } = useUserStore(
//     useShallow((state) => ({ setMyInfo: state.setMyInfo }))
//   );
//   const getAllList = useGetInterviewAllList(workspaceId || "");

//   useEffect(() => {
//     if (data) {
//       const now = Math.floor(Date.now() / 1000);
//       setMyInfo({
//         ...data,
//         workspaces: data.workspaces?.map((workspace) => ({
//           ...workspace, //
//           workspacePhotoUrl:
//             workspace.workspacePhotoUrl &&
//             `${workspace.workspacePhotoUrl}?t=${now}`,
//           profilePhotoUrl:
//             workspace.profilePhotoUrl &&
//             `${workspace.profilePhotoUrl}?t=${now}`,
//         })),
//       });
//       setDDUser({
//         id: data?._id,
//         email: data?.email,
//         name: data?.name,
//         companyName: data?.companyName,
//         job: data?.job,
//         workspaces: data?.workspaces?.map((workspace) => ({
//           workspaceId: workspace.workspaceId!,
//           workspaceName: workspace.workspaceName!,
//         })),
//       });
//       setWorkspaceId(data.workspaces[0]?.workspaceId || "");
//     }
//   }, [data]);

//   useEffect(() => {
//     if (!getAllList.isLoading && getAllList.isSuccess) {
//       const sortArray = getAllList.data.sort((a, b) =>
//         dayjs(a.interviewStartDate).isBefore(dayjs(b.interviewStartDate))
//           ? -1
//           : 1
//       );
//       sessionStorage.setItem(
//         SESSION_STORAGE_KEYS.INTERVIEW_ID_TITLE_ARRAY,
//         JSON.stringify(
//           sortArray.map((interview) => {
//             return {
//               _id: interview._id,
//               interviewDate: interview.interviewStartDate,
//               title: interview.title,
//               startDate: interview.recordingStartDate,
//               endDate: interview.recordingEndDate,
//             };
//           })
//         )
//       );
//     }
//   }, [getAllList.isLoading]);

//   const searchParams = new URLSearchParams(window.location.search);
//   const applicant = searchParams.get("applicant") ?? false;

//   return (
//     <>
//       <div className="w-full h-full flex">
//         {isAuthenticated && !applicant && <SideBar />}
//         <div className="flex-1 h-full flex flex-col">
//           <div className="flex-1 h-[calc(100%_-_88px)]">
//             <Outlet />
//           </div>
//           {SOLUTION === "interview" &&
//             (!location.pathname.includes("/interviews") && !location.pathname.includes("/result")) && (
//               <InterviewOutsideStatus />
//             )}
//         </div>
//         <ModalManager />
//       </div>

//       <UseWorkspaceSocket />
//       <UseNetworkStatus />
//       {SOLUTION === "interview" && (
//         <>
//           <UseVADState />
//           <UseMicrophonePermission />
//         </>
//       )}
//     </>
//   );
// }

// const router = createBrowserRouter([
//   { path: "/sign-in", element: <SignInPage /> },
//   {
//     element: <ProtectedRoute />,
//     children: [
//       { path: "/", element: <HomePage /> },
//       {
//         path: "/interviews",
//         children: [{ path: ":id", element: <InterviewDetailPage /> }],
//       },
//       { path: "/applicant-list", element: <ApplicantListPage /> },
//       { path: "/result", element: <ResultPage /> },
//       // { path: "/assignment-admin", element: <AssignmentAdminPage /> },
//       // { path: "/assignment-view", element: <AssignmentViewPage /> },
//       { path: "/assignment", element: <AssignmentPage /> },
//       { path: "/office", element: <OfficePage /> },
//       { path: "/monitoring", element: <MonitoringPage /> },
//       { path: "/data-setting", element: <DataSettingPage /> },
//       { path: "/profile", element: <ProfilePage /> },
//       { path: "/privacy-policy", element: <PrivacyPolicyPage /> },
//     ],
//   },
// ]);

// export { router };
