import {
  CategoriesIcon,
  HomeIcon,
  InstitutionsIcon,
  NotesIcon,
  PatientsIcon,
  PictogramsIcon,
  QuestionsIcon,
  TagsIcon,
  UsersIcon,
} from "@/_components/icons";

export const userRolelist = (pathname, perPage, catType, pictoType) => [
  {
    title: "Questions",
    url: `/dashboard/questions?size=${perPage}`,
    icon: <QuestionsIcon pathname={pathname} />,
  },
  {
    title: "Categories",
    url: `/dashboard/categories?size=${perPage}&type=${catType}`,
    icon: <CategoriesIcon pathname={pathname} />,
  },
  {
    title: "Pictograms",
    url: `/dashboard/pictograms?size=${perPage}&type=${pictoType}`,
    icon: <PictogramsIcon pathname={pathname} />,
  },
];

export const adminRoleList = (pathname, perPage) => [
  {
    title: "Users",
    url: `/dashboard/users?size=${perPage}`,
    icon: <UsersIcon pathname={pathname} />,
  },
  {
    title: "Patients",
    url: `/dashboard/patients?size=${perPage}`,
    icon: <PatientsIcon pathname={pathname} />,
  },
  {
    title: "Notes",
    url: `/dashboard/notes?size=${perPage}`,
    icon: <NotesIcon pathname={pathname} />,
  },
  {
    title: "Tags",
    url: `/dashboard/tags?size=${perPage}`,
    icon: <TagsIcon pathname={pathname} />,
  },
];

export const superAdminRoleList = (pathname, perPage) => [
  {
    title: "Institutions",
    url: `/dashboard/institutions?size=${perPage}`,
    icon: <InstitutionsIcon pathname={pathname} />,
  },
];
