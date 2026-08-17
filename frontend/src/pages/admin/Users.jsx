import { useCallback, useEffect, useState } from "react";

import {
  Search,
  RefreshCw,
  Users as UsersIcon,
  User,
  Mail,
  Phone,
  Shield,
  CalendarDays,
  Eye,
  UserCheck,
  UserX,
  X,
  Loader2,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  Filter,
} from "lucide-react";

import toast from "react-hot-toast";


// =========================================================
// API
// =========================================================

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL;


// =========================================================
// USERS PAGE
// =========================================================

function Users() {

  // =======================================================
  // DATA
  // =======================================================

  const [users, setUsers] = useState([]);

  const [loading, setLoading] = useState(true);

  const [refreshing, setRefreshing] = useState(false);

  const [error, setError] = useState("");


  // =======================================================
  // SEARCH / FILTERS
  // =======================================================

  const [searchInput, setSearchInput] = useState("");

  const [search, setSearch] = useState("");

  const [role, setRole] = useState("");

  const [status, setStatus] = useState("");


  // =======================================================
  // PAGINATION
  // =======================================================

  const [page, setPage] = useState(0);

  const [pageSize] = useState(20);

  const [totalPages, setTotalPages] = useState(0);

  const [totalElements, setTotalElements] = useState(0);


  // =======================================================
  // DETAILS
  // =======================================================

  const [selectedUser, setSelectedUser] = useState(null);

  const [detailsLoading, setDetailsLoading] = useState(false);

  const [showDetailsModal, setShowDetailsModal] = useState(false);


  // =======================================================
  // STATUS ACTION
  // =======================================================

  const [actionLoading, setActionLoading] = useState(false);

  const [actionUserId, setActionUserId] = useState(null);

  const [actionStatus, setActionStatus] = useState(null);


  // =======================================================
  // GET TOKEN
  // =======================================================

  const getToken = () => {
    return localStorage.getItem("token");
  };


  // =======================================================
  // LOAD USERS
  // =======================================================

  const loadUsers = useCallback(
    async (isRefresh = false) => {

      try {

        if (isRefresh) {
          setRefreshing(true);
        } else {
          setLoading(true);
        }

        setError("");


        const token = getToken();


        if (!token) {
          throw new Error(
            "Authentication token not found."
          );
        }


        // ---------------------------------------------------
        // BUILD QUERY
        // ---------------------------------------------------

        const params = new URLSearchParams();

        params.set(
          "page",
          page.toString()
        );

        params.set(
          "size",
          pageSize.toString()
        );


        if (search.trim()) {
          params.set(
            "search",
            search.trim()
          );
        }


        if (role) {
          params.set(
            "role",
            role
          );
        }


        if (status) {
          params.set(
            "status",
            status
          );
        }


        // ---------------------------------------------------
        // REQUEST
        // ---------------------------------------------------

        const response = await fetch(
          `${API_BASE_URL}/admin/users?${params.toString()}`,
          {
            method: "GET",

            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
            },
          }
        );


        const result =
          await response.json();


        if (!response.ok) {

          throw new Error(
            result?.message ||
              "Failed to load users."
          );
        }


        const data =
          result?.data;


        setUsers(
          data?.content || []
        );

        setTotalPages(
          data?.totalPages || 0
        );

        setTotalElements(
          data?.totalElements || 0
        );

      } catch (error) {

        console.error(
          "Failed to load users:",
          error
        );

        setError(
          error.message ||
            "Unable to load users."
        );

      } finally {

        setLoading(false);

        setRefreshing(false);
      }

    },
    [
      page,
      pageSize,
      search,
      role,
      status,
    ]
  );


  // =======================================================
  // INITIAL / FILTER LOAD
  // =======================================================

  useEffect(() => {

    loadUsers();

  }, [loadUsers]);


  // =======================================================
  // SEARCH SUBMIT
  // =======================================================

  const handleSearch = (event) => {

    event.preventDefault();

    setPage(0);

    setSearch(
      searchInput.trim()
    );
  };


  // =======================================================
  // ROLE CHANGE
  // =======================================================

  const handleRoleChange = (
    event
  ) => {

    setRole(
      event.target.value
    );

    setPage(0);
  };


  // =======================================================
  // STATUS CHANGE
  // =======================================================

  const handleStatusChange = (
    event
  ) => {

    setStatus(
      event.target.value
    );

    setPage(0);
  };


  // =======================================================
  // CLEAR FILTERS
  // =======================================================

  const clearFilters = () => {

    setSearchInput("");

    setSearch("");

    setRole("");

    setStatus("");

    setPage(0);
  };


  // =======================================================
  // VIEW USER
  // =======================================================

  const viewUser = async (
    userId
  ) => {

    try {

      setDetailsLoading(true);

      setShowDetailsModal(true);

      setSelectedUser(null);

      setError("");


      const token = getToken();


      if (!token) {
        throw new Error(
          "Authentication token not found."
        );
      }


      const response = await fetch(
        `${API_BASE_URL}/admin/users/${userId}`,
        {
          method: "GET",

          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );


      const result =
        await response.json();


      if (!response.ok) {

        throw new Error(
          result?.message ||
            "Failed to load user details."
        );
      }


      setSelectedUser(
        result?.data
      );

    } catch (error) {

      console.error(
        "Failed to load user:",
        error
      );

      setError(
        error.message ||
          "Unable to load user details."
      );

      setShowDetailsModal(false);

    } finally {

      setDetailsLoading(false);
    }
  };


  // =======================================================
  // UPDATE STATUS
  // =======================================================

  const updateUserStatus = async (
    user
  ) => {

    if (!user) {
      return;
    }


    const newStatus =
      user.status === "ACTIVE"
        ? "INACTIVE"
        : "ACTIVE";


    // -----------------------------------------------------
    // Protect admin account in frontend
    // -----------------------------------------------------

    const currentUser =
      getCurrentUser();


    if (
      currentUser?.id &&
      Number(currentUser.id) ===
        Number(user.id) &&
      newStatus === "INACTIVE"
    ) {

      const message =
        "You cannot deactivate your own admin account.";

      setError(message);
      toast.error(message);

      return;
    }


    // -----------------------------------------------------
    // Confirmation
    // -----------------------------------------------------

    const action =
      newStatus === "ACTIVE"
        ? "activate"
        : "deactivate";


    const confirmed =
      window.confirm(
        `Are you sure you want to ${action} ${user.name}?`
      );


    if (!confirmed) {
      return;
    }


    try {

      setActionLoading(true);

      setActionUserId(user.id);

      setActionStatus(newStatus);

      setError("");


      const token = getToken();


      if (!token) {
        throw new Error(
          "Authentication token not found."
        );
      }


      const response = await fetch(
        `${API_BASE_URL}/admin/users/${user.id}/status`,
        {
          method: "PATCH",

          headers: {
            Authorization: `Bearer ${token}`,

            Accept: "application/json",

            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            status: newStatus,
          }),
        }
      );


      const result =
        await response.json();


      if (!response.ok) {

        throw new Error(
          result?.message ||
            "Failed to update user status."
        );
      }


      const updatedUser =
        result?.data;


      // ---------------------------------------------------
      // Update current table immediately
      // ---------------------------------------------------

      setUsers(
        (previous) =>
          previous.map(
            (item) =>
              item.id === user.id
                ? updatedUser
                : item
          )
      );


      // ---------------------------------------------------
      // Update modal if open
      // ---------------------------------------------------

      setSelectedUser(
        (previous) =>
          previous?.id === user.id
            ? updatedUser
            : previous
      );

      toast.success(
        `${user.name} ${newStatus === "ACTIVE" ? "activated" : "deactivated"} successfully.`,
        {
          duration: 3500,
        }
      );

    } catch (error) {

      console.error(
        "Failed to update user status:",
        error
      );

      const message =
        error.message ||
        "Unable to update user status.";

      setError(message);
      toast.error(message);

    } finally {

      setActionLoading(false);

      setActionUserId(null);

      setActionStatus(null);
    }
  };


  // =======================================================
  // LOADING
  // =======================================================

  if (loading) {

    return (
      <div className="min-h-screen bg-[#F8FAFD] px-5 py-8 text-[#17233D] sm:px-8 lg:px-10">

        <PageHeader />

        <div className="mt-8 space-y-4">

          {[1, 2, 3, 4].map(
            (item) => (
              <div
                key={item}
                className="
                  h-20
                  animate-pulse
                  rounded-2xl
                  border
                  border-white/[0.06]
                  bg-white
                "
              />
            )
          )}

        </div>

      </div>
    );
  }


  // =======================================================
  // MAIN
  // =======================================================

  return (
    <div className="min-h-screen min-w-0 overflow-x-hidden bg-[#F8FAFD] px-5 py-8 text-[#17233D] sm:px-8 lg:px-10">


      {/* ===================================================
          HEADER
      =================================================== */}

      <PageHeader
        refreshing={refreshing}
        onRefresh={() =>
          loadUsers(true)
        }
      />


      {/* ===================================================
          ERROR
      =================================================== */}

      {error && (

        <div
          className="
            mt-6
            flex
            items-start
            gap-3
            rounded-xl
            border
            border-red-200
            bg-red-50
            p-4
            text-sm
            text-red-700
          "
        >

          <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" />

          <span className="flex-1">
            {error}
          </span>

          <button
            onClick={() =>
              setError("")
            }
            className="text-red-600 hover:text-red-700"
          >
            <X className="h-4 w-4" />
          </button>

        </div>
      )}


      {/* ===================================================
          SUMMARY
      =================================================== */}

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">

        <SummaryCard
          icon={UsersIcon}
          label="Total Users"
          value={totalElements}
        />

        <SummaryCard
          icon={UserCheck}
          label="Active"
          value={
            users.filter(
              (user) =>
                user.status ===
                "ACTIVE"
            ).length
          }
        />

        <SummaryCard
          icon={UserX}
          label="Inactive"
          value={
            users.filter(
              (user) =>
                user.status ===
                "INACTIVE"
            ).length
          }
        />

      </div>


      {/* ===================================================
          FILTERS
      =================================================== */}

      <section className="mt-8">

        <div
          className="
            rounded-2xl
            border
            border-[#E6EAF0]
            bg-white
            p-4
          "
        >

          <div className="flex items-center gap-2">

            <Filter className="h-4 w-4 text-[#1557D6]" />

            <span className="text-sm font-bold text-[#111827]">
              Filters
            </span>

          </div>


          <div className="mt-4 grid grid-cols-1 gap-3 lg:grid-cols-[1fr_180px_180px_auto]">

            {/* Search */}

            <form
              onSubmit={
                handleSearch
              }
              className="relative"
            >

              <Search
                className="
                  pointer-events-none
                  absolute
                  left-3
                  top-1/2
                  h-4
                  w-4
                  -translate-y-1/2
                  text-[#111827]
                "
              />

              <input
                type="text"
                value={
                  searchInput
                }
                onChange={(event) =>
                  setSearchInput(
                    event.target.value
                  )
                }
                placeholder="Search by name or email..."
                className="
                  h-11
                  w-full
                  rounded-xl
                  border
                  border-[#E6EAF0]
                  bg-white
                  pl-10
                  pr-4
                  text-sm
                  text-[#17233D]
                  outline-none
                  placeholder:text-[#374151]
                  focus:border-[#9FB8E8]
                "
              />

            </form>


            {/* Role */}

            <select
              value={role}
              onChange={
                handleRoleChange
              }
              className="
                h-11
                rounded-xl
                border
                border-[#E6EAF0]
                bg-white
                px-3
                text-sm
                text-[#17233D]
                outline-none
                focus:border-[#9FB8E8]
              "
            >

              <option value="">
                All Roles
              </option>

              <option value="DONOR">
                Donor
              </option>

              <option value="FOUNDATION">
                Foundation
              </option>

              <option value="ADMIN">
                Admin
              </option>

            </select>


            {/* Status */}

            <select
              value={status}
              onChange={
                handleStatusChange
              }
              className="
                h-11
                rounded-xl
                border
                border-[#E6EAF0]
                bg-white
                px-3
                text-sm
                text-[#17233D]
                outline-none
                focus:border-[#9FB8E8]
              "
            >

              <option value="">
                All Status
              </option>

              <option value="ACTIVE">
                Active
              </option>

              <option value="INACTIVE">
                Inactive
              </option>

            </select>


            {/* Clear */}

            {(search ||
              role ||
              status) && (

              <button
                onClick={
                  clearFilters
                }
                className="
                  h-11
                  rounded-xl
                  border
                  border-[#E6EAF0]
                  px-4
                  text-sm
                  text-[#17233D]
                  transition
                  hover:bg-[#F2F6FF]
                  hover:text-[#17233D]
                "
              >
                Clear
              </button>

            )}

          </div>

        </div>

      </section>


      {/* ===================================================
          USERS TABLE
      =================================================== */}

      <section className="mt-8">

        <div className="mb-4">

          <h2 className="text-lg font-semibold">
            Registered Users
          </h2>

          <p className="mt-1 text-sm text-[#17233D]">
            Manage FoodBridge accounts and access status.
          </p>

        </div>


        {users.length === 0 ? (

          <EmptyState />

        ) : (

          <div className="overflow-hidden rounded-2xl border border-[#E6EAF0]">

            {/* =============================================
                DESKTOP
            ============================================= */}

            <div className="hidden overflow-x-auto md:block">

              <table className="w-full min-w-[950px]">

                <thead className="border-b border-[#E6EAF0] bg-white">

                  <tr>

                    <TableHeader>
                      User
                    </TableHeader>

                    <TableHeader>
                      Contact
                    </TableHeader>

                    <TableHeader>
                      Role
                    </TableHeader>

                    <TableHeader>
                      Status
                    </TableHeader>

                    <TableHeader>
                      Joined
                    </TableHeader>

                    <TableHeader align="right">
                      Actions
                    </TableHeader>

                  </tr>

                </thead>


                <tbody className="divide-y divide-[#EEF1F5]">

                  {users.map(
                    (user) => {

                      const isCurrentAdmin =
                        isCurrentUser(
                          user.id
                        );


                      return (
                        <tr
                          key={user.id}
                          className="transition hover:bg-white"
                        >

                          {/* User */}

                          <td className="px-5 py-5">

                            <div className="flex items-center gap-3">

                              <UserAvatar
                                name={
                                  user.name
                                }
                              />

                              <div className="min-w-0">

                                <p className="truncate font-bold text-[#111827]">
                                  {user.name}
                                </p>

                                <p className="mt-1 text-xs text-[#111827]">
                                  ID #{user.id}
                                </p>

                              </div>

                            </div>

                          </td>


                          {/* Contact */}

                          <td className="px-5 py-5">

                            <div className="space-y-1">

                              <p className="max-w-[220px] truncate text-sm font-semibold text-[#111827]">
                                {user.email}
                              </p>

                              <p className="text-xs text-[#111827]">
                                {user.phone ||
                                  "No phone"}
                              </p>

                            </div>

                          </td>


                          {/* Role */}

                          <td className="px-5 py-5">

                            <RoleBadge
                              role={
                                user.role
                              }
                            />

                          </td>


                          {/* Status */}

                          <td className="px-5 py-5">

                            <StatusBadge
                              status={
                                user.status
                              }
                            />

                          </td>


                          {/* Joined */}

                          <td className="px-5 py-5">

                            <span className="text-sm font-semibold text-[#111827]">
                              {formatDate(
                                user.createdAt
                              )}
                            </span>

                          </td>


                          {/* Actions */}

                          <td className="px-5 py-5">

                            <div className="flex justify-end gap-2">

                              <ActionButton
                                icon={
                                  Eye
                                }
                                label="View"
                                onClick={() =>
                                  viewUser(
                                    user.id
                                  )
                                }
                              />


                              <ActionButton
                                icon={
                                  user.status ===
                                  "ACTIVE"
                                    ? UserX
                                    : UserCheck
                                }
                                label={
                                  user.status ===
                                  "ACTIVE"
                                    ? "Deactivate"
                                    : "Activate"
                                }
                                danger={
                                  user.status ===
                                  "ACTIVE"
                                }
                                success={
                                  user.status !==
                                  "ACTIVE"
                                }
                                disabled={
                                  isCurrentAdmin ||
                                  user.role ===
                                    "ADMIN"
                                }
                                loading={
                                  actionLoading &&
                                  actionUserId ===
                                    user.id
                                }
                                onClick={() =>
                                  updateUserStatus(
                                    user
                                  )
                                }
                              />

                            </div>

                          </td>

                        </tr>
                      );
                    }
                  )}

                </tbody>

              </table>

            </div>


            {/* =============================================
                MOBILE
            ============================================= */}

            <div className="divide-y divide-[#EEF1F5] md:hidden">

              {users.map(
                (user) => (

                  <UserCard
                    key={user.id}
                    user={user}
                    onView={() =>
                      viewUser(
                        user.id
                      )
                    }
                    onStatusChange={() =>
                      updateUserStatus(
                        user
                      )
                    }
                    loading={
                      actionLoading &&
                      actionUserId ===
                        user.id
                    }
                  />

                )
              )}

            </div>

          </div>

        )}

      </section>


      {/* ===================================================
          PAGINATION
      =================================================== */}

      {totalPages > 1 && (

        <Pagination
          page={page}
          totalPages={totalPages}
          totalElements={
            totalElements
          }
          pageSize={pageSize}
          onPrevious={() =>
            setPage(
              (previous) =>
                Math.max(
                  previous - 1,
                  0
                )
            )
          }
          onNext={() =>
            setPage(
              (previous) =>
                Math.min(
                  previous + 1,
                  totalPages - 1
                )
            )
          }
        />

      )}


      {/* ===================================================
          DETAILS MODAL
      =================================================== */}

      {showDetailsModal && (

        <UserDetailsModal
          user={selectedUser}
          loading={
            detailsLoading
          }
          onClose={() =>
            setShowDetailsModal(
              false
            )
          }
          onStatusChange={() => {

            if (selectedUser) {
              updateUserStatus(
                selectedUser
              );
            }

          }}
          actionLoading={
            actionLoading
          }
        />

      )}

    </div>
  );
}


// =========================================================
// PAGE HEADER
// =========================================================

function PageHeader({
  refreshing = false,
  onRefresh,
}) {

  return (
    <header>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">

        <div>

          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#1557D6]">
            Administration
          </p>

          <h1 className="mt-2 text-2xl font-bold sm:text-3xl">
            Users
          </h1>

          <p className="mt-2 text-sm text-[#17233D]">
            Manage registered FoodBridge accounts and access.
          </p>

        </div>


        <button
          onClick={onRefresh}
          disabled={refreshing}
          className="
            inline-flex
            items-center
            justify-center
            gap-2
            rounded-xl
            border
            border-[#D9E1ED]
            bg-white
            px-4
            py-2.5
            text-sm
            text-[#17233D]
            transition
            hover:bg-[#EEF3FB]
            disabled:cursor-not-allowed
            disabled:opacity-50
          "
        >

          <RefreshCw
            className={`h-4 w-4 ${
              refreshing
                ? "animate-spin"
                : ""
            }`}
          />

          Refresh

        </button>

      </div>

    </header>
  );
}


// =========================================================
// SUMMARY CARD
// =========================================================

function SummaryCard({
  icon: Icon,
  label,
  value,
}) {

  return (
    <div className="rounded-2xl border border-[#E6EAF0] bg-white shadow-[0_3px_14px_rgba(23,35,61,0.035)] p-5">

      <div className="flex items-center justify-between">

        <div>

          <p className="text-sm font-semibold text-[#111827]">
            {label}
          </p>

          <p className="mt-2 text-2xl font-bold">
            {value}
          </p>

        </div>


        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#F2F6FF]">

          <Icon className="h-5 w-5 text-[#1557D6]" />

        </div>

      </div>

    </div>
  );
}


// =========================================================
// TABLE HEADER
// =========================================================

function TableHeader({
  children,
  align = "left",
}) {

  return (
    <th
      className={`px-5 py-4 text-xs font-extrabold uppercase tracking-wider text-[#111827] ${
        align === "right"
          ? "text-right"
          : "text-left"
      }`}
    >
      {children}
    </th>
  );
}


// =========================================================
// USER AVATAR
// =========================================================

function UserAvatar({
  name,
}) {

  const initial =
    name?.trim()?.charAt(0)?.toUpperCase() ||
    "?";


  return (
    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#F2F6FF] text-sm font-semibold text-[#1557D6]">
      {initial}
    </div>
  );
}


// =========================================================
// ROLE BADGE
// =========================================================

function RoleBadge({
  role,
}) {

  return (
    <span
      className="
        inline-flex
        items-center
        gap-1.5
        rounded-full
        border
        border-[#D9E1ED]
        bg-white
        px-2.5
        py-1
        text-xs
        font-bold
        text-[#111827]
      "
    >

      <Shield className="h-3 w-3" />

      {role}

    </span>
  );
}


// =========================================================
// STATUS BADGE
// =========================================================

function StatusBadge({
  status,
}) {

  const active =
    status === "ACTIVE";


  return (
    <span
      className={`
        inline-flex
        items-center
        gap-1.5
        rounded-full
        border
        px-2.5
        py-1
        text-xs
        font-bold

        ${
          active
            ? "border-[#C9D8F2] bg-[#F2F6FF] text-[#1557D6]"
            : "border-red-200 bg-red-50 text-red-600"
        }
      `}
    >

      <span
        className={`h-1.5 w-1.5 rounded-full ${
          active
            ? "bg-[#1557D6]"
            : "bg-red-400"
        }`}
      />

      {status}

    </span>
  );
}


// =========================================================
// ACTION BUTTON
// =========================================================

function ActionButton({
  icon: Icon,
  label,
  onClick,
  success = false,
  danger = false,
  disabled = false,
  loading = false,
}) {

  return (
    <button
      onClick={onClick}
      disabled={
        disabled ||
        loading
      }
      title={
        disabled
          ? "This action is unavailable"
          : label
      }
      className={`
        inline-flex
        items-center
        gap-1.5
        rounded-lg
        border
        px-3
        py-2
        text-xs
        font-medium
        transition
        disabled:cursor-not-allowed
        disabled:opacity-40

        ${
          success
            ? "border-[#C9D8F2] bg-[#F2F6FF] text-[#1557D6] hover:bg-[#F2F6FF]"
            : danger
            ? "border-red-200 bg-red-50 text-red-600 hover:bg-red-100"
            : "border-[#E6EAF0] bg-white text-[#17233D] hover:bg-[#EEF3FB] hover:text-[#17233D]"
        }
      `}
    >

      {loading ? (
        <Loader2 className="h-3.5 w-3.5 animate-spin" />
      ) : (
        <Icon className="h-3.5 w-3.5" />
      )}

      <span className="hidden xl:inline">
        {label}
      </span>

    </button>
  );
}


// =========================================================
// MOBILE USER CARD
// =========================================================

function UserCard({
  user,
  onView,
  onStatusChange,
  loading,
}) {

  const isAdmin =
    user.role === "ADMIN";


  const currentUser =
    isCurrentUser(
      user.id
    );


  const disableStatus =
    isAdmin ||
    currentUser;


  return (
    <div className="p-5">

      <div className="flex items-start gap-3">

        <UserAvatar
          name={user.name}
        />

        <div className="min-w-0 flex-1">

          <div className="flex items-start justify-between gap-3">

            <div className="min-w-0">

              <h3 className="truncate font-bold text-[#111827]">
                {user.name}
              </h3>

              <p className="mt-1 truncate text-xs text-[#111827]">
                ID #{user.id}
              </p>

            </div>

            <StatusBadge
              status={
                user.status
              }
            />

          </div>


          <div className="mt-4 space-y-2">

            <div className="flex items-center gap-2 text-sm font-semibold text-[#111827]">

              <Mail className="h-4 w-4 shrink-0 text-[#17233D]" />

              <span className="truncate">
                {user.email}
              </span>

            </div>


            <div className="flex items-center gap-2 text-sm font-semibold text-[#111827]">

              <Phone className="h-4 w-4 shrink-0 text-[#17233D]" />

              <span>
                {user.phone ||
                  "No phone number"}
              </span>

            </div>


            <RoleBadge
              role={
                user.role
              }
            />

          </div>


          <div className="mt-5 flex gap-2">

            <ActionButton
              icon={Eye}
              label="View"
              onClick={onView}
            />

            <ActionButton
              icon={
                user.status ===
                "ACTIVE"
                  ? UserX
                  : UserCheck
              }
              label={
                user.status ===
                "ACTIVE"
                  ? "Deactivate"
                  : "Activate"
              }
              danger={
                user.status ===
                "ACTIVE"
              }
              success={
                user.status !==
                "ACTIVE"
              }
              disabled={
                disableStatus
              }
              loading={
                loading
              }
              onClick={
                onStatusChange
              }
            />

          </div>

        </div>

      </div>

    </div>
  );
}


// =========================================================
// EMPTY STATE
// =========================================================

function EmptyState() {

  return (
    <div className="rounded-2xl border border-dashed border-[#D9E1ED] bg-white px-6 py-16 text-center">

      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#F8FAFD]">

        <UsersIcon className="h-7 w-7 text-[#111827]" />

      </div>

      <h3 className="mt-5 font-bold text-[#111827]">
        No users found
      </h3>

      <p className="mx-auto mt-2 max-w-md text-sm text-[#111827]">
        Try changing your search or filters.
      </p>

    </div>
  );
}


// =========================================================
// PAGINATION
// =========================================================

function Pagination({
  page,
  totalPages,
  totalElements,
  pageSize,
  onPrevious,
  onNext,
}) {

  const start =
    page * pageSize + 1;


  const end =
    Math.min(
      (page + 1) * pageSize,
      totalElements
    );


  return (
    <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

      <p className="text-sm text-[#111827]">

        Showing{" "}
        <span className="font-semibold text-[#111827]">
          {start}
        </span>
        {" "}–{" "}
        <span className="font-semibold text-[#111827]">
          {end}
        </span>
        {" "}of{" "}
        <span className="font-semibold text-[#111827]">
          {totalElements}
        </span>

      </p>


      <div className="flex items-center gap-2">

        <button
          onClick={
            onPrevious
          }
          disabled={
            page === 0
          }
          className="
            inline-flex
            h-10
            items-center
            gap-2
            rounded-xl
            border
            border-[#E6EAF0]
            px-3
            text-sm
            text-[#17233D]
            hover:bg-[#F2F6FF]
            disabled:cursor-not-allowed
            disabled:opacity-30
          "
        >

          <ChevronLeft className="h-4 w-4" />

          Previous

        </button>


        <div className="flex h-10 min-w-10 items-center justify-center rounded-xl bg-[#F2F6FF] px-3 text-sm text-[#17233D]">

          {page + 1}

          <span className="mx-1 text-[#17233D]">
            /
          </span>

          {totalPages}

        </div>


        <button
          onClick={
            onNext
          }
          disabled={
            page >=
            totalPages - 1
          }
          className="
            inline-flex
            h-10
            items-center
            gap-2
            rounded-xl
            border
            border-[#E6EAF0]
            px-3
            text-sm
            text-[#17233D]
            hover:bg-[#F2F6FF]
            disabled:cursor-not-allowed
            disabled:opacity-30
          "
        >

          Next

          <ChevronRight className="h-4 w-4" />

        </button>

      </div>

    </div>
  );
}


// =========================================================
// USER DETAILS MODAL
// =========================================================

function UserDetailsModal({
  user,
  loading,
  onClose,
  onStatusChange,
  actionLoading,
}) {

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">

      <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-[#D9E1ED] bg-white">

        {/* Header */}

        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-[#E6EAF0] bg-white px-6 py-5">

          <div>

            <p className="text-xs font-semibold uppercase tracking-wider text-[#1557D6]">
              User Management
            </p>

            <h2 className="mt-1 text-lg font-extrabold text-[#111827]">
              User Details
            </h2>

          </div>


          <button
            onClick={
              onClose
            }
            className="rounded-lg p-2 text-[#17233D] transition hover:bg-[#F2F6FF] hover:text-[#17233D]"
          >
            <X className="h-5 w-5" />
          </button>

        </div>


        {loading ? (

          <div className="flex min-h-80 items-center justify-center">

            <Loader2 className="h-7 w-7 animate-spin text-[#1557D6]" />

          </div>

        ) : user ? (

          <>

            {/* User heading */}

            <div className="flex items-center gap-4 border-b border-[#E6EAF0] p-6">

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#F2F6FF] text-xl font-bold text-[#1557D6]">

                {user.name
                  ?.charAt(0)
                  ?.toUpperCase()}

              </div>


              <div className="min-w-0 flex-1">

                <h3 className="truncate text-lg font-extrabold text-[#111827]">
                  {user.name}
                </h3>

                <p className="mt-1 truncate text-sm text-[#17233D]">
                  {user.email}
                </p>

              </div>


              <StatusBadge
                status={
                  user.status
                }
              />

            </div>


            {/* Details */}

            <div className="grid gap-4 p-6 sm:grid-cols-2">

              <DetailItem
                icon={User}
                label="User ID"
                value={`#${user.id}`}
              />

              <DetailItem
                icon={Shield}
                label="Role"
                value={
                  user.role
                }
              />

              <DetailItem
                icon={Mail}
                label="Email"
                value={
                  user.email
                }
              />

              <DetailItem
                icon={Phone}
                label="Phone"
                value={
                  user.phone ||
                  "Not provided"
                }
              />

              <DetailItem
                icon={CalendarDays}
                label="Created"
                value={formatDate(
                  user.createdAt
                )}
              />

              <DetailItem
                icon={CalendarDays}
                label="Last Updated"
                value={formatDate(
                  user.updatedAt
                )}
              />

            </div>


            {/* Action */}

            {user.role !==
              "ADMIN" && (

              <div className="border-t border-[#E6EAF0] p-6">

                <button
                  onClick={
                    onStatusChange
                  }
                  disabled={
                    actionLoading
                  }
                  className={`
                    inline-flex
                    w-full
                    items-center
                    justify-center
                    gap-2
                    rounded-xl
                    px-5
                    py-3
                    text-sm
                    font-semibold
                    transition

                    ${
                      user.status ===
                      "ACTIVE"
                        ? "border border-red-200 bg-red-50 text-red-600 hover:bg-red-100"
                        : "bg-[#1557D6] text-white hover:bg-[#0F46B5]"
                    }

                    disabled:cursor-not-allowed
                    disabled:opacity-50
                  `}
                >

                  {actionLoading ? (

                    <Loader2 className="h-4 w-4 animate-spin" />

                  ) : user.status ===
                    "ACTIVE" ? (

                    <UserX className="h-4 w-4" />

                  ) : (

                    <UserCheck className="h-4 w-4" />

                  )}


                  {actionLoading
                    ? "Processing..."
                    : user.status ===
                      "ACTIVE"
                    ? "Deactivate Account"
                    : "Activate Account"}

                </button>

              </div>

            )}

          </>

        ) : null}

      </div>

    </div>
  );
}


// =========================================================
// DETAIL ITEM
// =========================================================

function DetailItem({
  icon: Icon,
  label,
  value,
}) {

  return (
    <div className="rounded-xl border border-[#D9E1ED] bg-white p-4 shadow-[0_2px_8px_rgba(23,35,61,0.025)]">

      <div className="flex items-center gap-2">

        <Icon className="h-4 w-4 text-[#111827]" />

        <p className="text-xs font-extrabold uppercase tracking-[0.08em] text-[#111827]">
          {label}
        </p>

      </div>

      <p className="mt-2 break-words text-sm font-bold leading-6 text-[#111827]">
        {value || "—"}
      </p>

    </div>
  );
}


// =========================================================
// FORMAT DATE
// =========================================================

function formatDate(
  value
) {

  if (!value) {
    return "—";
  }


  return new Date(
    value
  ).toLocaleString(
    "en-IN",
    {
      dateStyle: "medium",
      timeStyle: "short",
    }
  );
}


// =========================================================
// CURRENT USER
// =========================================================

function getCurrentUser() {

  try {

    const storedUser =
      localStorage.getItem(
        "user"
      );


    if (!storedUser) {
      return null;
    }


    return JSON.parse(
      storedUser
    );

  } catch {

    return null;
  }
}


// =========================================================
// CURRENT USER CHECK
// =========================================================

function isCurrentUser(
  userId
) {

  const currentUser =
    getCurrentUser();


  if (!currentUser?.id) {
    return false;
  }


  return (
    Number(
      currentUser.id
    ) === Number(userId)
  );
}


export default Users;