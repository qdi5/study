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
import TbFooter from "./TbFooter/TbFooter";
import TbTriangle from "./TbTriangle"
import LoadRemotejs from "./LoadRemotejs"
import TbLayout from "./Layout"
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
    TbFooter,
    TbTriangle,
    LoadRemotejs,
    TbLayout
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