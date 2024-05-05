import { Drawer, Menu } from 'antd';
import { useEffect, useState } from 'react';


const LeftMenu = ({ mode }) => {
    return (
        <Menu mode={mode} className='inline-block' >
            <Menu.Item key="home">
                Home
            </Menu.Item>
            <Menu.Item key="matches">
                Matches
            </Menu.Item>
            <Menu.Item key="results">
                Results
            </Menu.Item>
            <Menu.Item key="stats">
                Stats
            </Menu.Item>
        </Menu>
    );
};

const RightMenu = ({ mode }) => {
    return (
        // <Menu mode={mode} className='inline-block float-right invisible md:visible'>
        <Menu mode={mode} className='inline-block float-right'>
            <Menu.Item key="sign-in">Sign In</Menu.Item>
        </Menu>
    );
};

function NavBar() {
    const [visible, setVisible] = useState(false);
    const showDrawer = () => {
        setVisible(!visible);
    };

    useEffect(() => {
        setVisible(false);
    }, []);

    return (
        <nav className="navbar">
            <div className="navbar-menu">
                <LeftMenu mode={"horizontal"} />

                {/* <Button className="inline-block md:hidden" type="text" onClick={showDrawer}>
                    <span>Show</span>
                </Button> */}

                <RightMenu mode={"horizontal"} />

                <Drawer
                    title={"Brand Here"}
                    placement="right"
                    closable={true}
                    onClose={showDrawer}
                    open={visible}
                    style={{ zIndex: 99999 }}
                >
                    <LeftMenu mode={"inline"} />
                    <RightMenu mode={"inline"} />
                </Drawer>
            </div>
        </nav >
    );
}

export default NavBar;
