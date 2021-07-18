// 通用基础组件，可全局注册（可包括使用的UI库的组件）
import { 
    Row,
    Col, 
    Menu, 
    Submenu, 
    MenuItem, 
    MenuItemGroup,
    Container,
    Header,
    Aside,
    Main,
    Footer,
    Tabs,
    TabPane,
    Breadcrumb,
    BreadcrumbItem, 
    PageHeader,
    Dialog,
    Button,
    ButtonGroup,
    Carousel,
    CarouselItem,
    Backtop,
    Scrollbar
} from "element-ui";
import TbHeader from "./TbHeader";
import TbFooter from "./TbFooter";
const components = {
    Row,
    Col, 
    Menu,
    Submenu,
    MenuItem,
    MenuItemGroup,
    Container,
    Header,
    Aside,
    Main,
    Footer,
    Tabs,
    TabPane,
    Breadcrumb,
    BreadcrumbItem,
    PageHeader,
    Dialog,
    Button,
    ButtonGroup,
    Carousel,
    CarouselItem,
    Backtop,
    Scrollbar,
    TbHeader,
    TbFooter
}
const install = app => {
    Object.keys(components).forEach(key => {
        app.component(components[key].name, components[key])
    })
}

const TbUI = {
    install
}

export default TbUI