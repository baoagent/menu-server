
export interface MenuItem {
    id: string;
    name: string;
    description: string;
    price: number;
    menuCategoryId: string;
}

export interface MenuCategory {
    id: string;
    name: string;
    menuItems: MenuItem[];
}
