import classNames from "classnames"
import PropTypes from "prop-types"
import { useState } from "react"

const cl = classNames.bind()

const Tabs = ({ children, ...props }) => {
    const [activeTab, setActiveTab] = useState(children[0].props.label)

    const handleClick = (newActiveTab) => {
        setActiveTab(newActiveTab)
    }

    return (
        <div className=" mx-auto" {...props}>
            <div className="flex border-b border-gray-300 justify-start items-center space-x-1">
                {children.map((child) => (
                    <div
                        key={child.props.label}
                        className={cl("rounded-t-md border-t border-r border-l py-1 px-3 font-medium cursor-pointer", {
                            "text-blue-400": activeTab === child.props.label,
                        })}
                        onClick={() => handleClick(child.props.label)}
                    >
                        {child.props.label}
                    </div>
                ))}
            </div>
            <div className="">
                {children.map((child) => {
                    if (child.props.label === activeTab) {
                        return <div key={child.props.label}>{child.props.children}</div>
                    }
                    return null
                })}
            </div>
        </div>
    )
}

const Tab = ({ label, children, className }) => {
    return (
        <div label={label} className={cl("hidden", { className: !!className })}>
            {children}
        </div>
    )
}

Tabs.propTypes = {
    children: PropTypes.any,
}
Tab.propTypes = {
    children: PropTypes.array,
    label: PropTypes.string,
    className: PropTypes.string,
}

export { Tabs, Tab }
