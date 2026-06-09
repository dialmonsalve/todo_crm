export interface Link {
  name: string;
  icon: string;
  hasChildren: boolean;
  subMenu?: SubMenuAdmin[];
  href?: string;
  permission: string;
}

export interface SubMenuAdmin {
  name: string;
  href: string;
}

const LINKS: Link[] = [
  {
    name: "Inicio",
    icon: "home",
    hasChildren: false,
    href: "/bar-commander",
    permission: "public",
  },
  {
    name: "Páginas",
    icon: "pages",
    hasChildren: true,
    permission: "Page",
    subMenu: [
      {
        name: "inicio",
        href: "/bar-commander/content/home",
      },
      {
        name: "equipos",
        href: "/bar-commander/content/1234",
      },
      {
        name: "Internet hogar",
        href: "/bar-commander/content/12345",
      },
      {
        name: "Planes",
        href: "/bar-commander/content/123456",
      },
      {
        name: "Whisky",
        href: "/bar-commander/content/1234567",
      },
      {
        name: "Other",
        href: "/bar-commander/content/12345678",
      },
      {
        name: "Other2",
        href: "/bar-commander/content/0123",
      },
    ],
  },
  {
    name: "Productos",
    icon: "phone",
    hasChildren: true,
    permission: "Product",
    subMenu: [
      {
        name: "Ver todos",
        href: "/bar-commander/configurations/products",
      },
      {
        name: "Crear",
        href: "/bar-commander/configurations/products/create",
      },
    ],
  },
  {
    name: "Configuraciones",
    href: "/bar-commander/configurations",
    icon: "configuration",
    hasChildren: false,
    permission: "Config",
  },
];

export default LINKS;