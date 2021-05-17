import React from 'react';
import { Divider, List } from '@material-ui/core';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import FuseNavVerticalGroup from './vertical/FuseNavVerticalGroup';
import FuseNavVerticalCollapse from './vertical/FuseNavVerticalCollapse';
import FuseNavVerticalItem from './vertical/FuseNavVerticalItem';
import FuseNavVerticalLink from './vertical/FuseNavVerticalLink';

function Navigation(props) {
    const { navigation, active, dense, className } = props;

    const verticalNav = (
        <List className={clsx("navigation whitespace-no-wrap overflow-x-hidden", className)}>
            {
                navigation.map((item) => (

                    <React.Fragment key={item.id}>

                        {item.type === 'group' && (
                            <FuseNavVerticalGroup item={item} nestedLevel={0} active={active} dense={dense} />
                        )}

                        {item.type === 'collapse' && (
                            <FuseNavVerticalCollapse item={item} nestedLevel={0} active={active} dense={dense} />
                        )}

                        {item.type === 'item' && (
                            <FuseNavVerticalItem item={item} nestedLevel={0} active={active} dense={dense} />
                        )}

                        {item.type === 'link' && (
                            <FuseNavVerticalLink item={item} nestedLevel={0} active={active} dense={dense} />
                        )}

                        {item.type === 'divider' && (
                            <Divider className="my-16" />
                        )}
                    </React.Fragment>
                ))
            }
        </List>
    );

    if (navigation.length > 0) {
        return verticalNav;
    }
    else {
        return null;
    }
}

Navigation.propTypes = {
    navigation: PropTypes.array.isRequired
};

Navigation.defaultProps = {
    layout: "vertical"
};

export default React.memo(Navigation);
