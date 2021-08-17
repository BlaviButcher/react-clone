function createElement(type, props, ...children) {
    return {
        type,
        props: {
            ...props,
            // if child is primitive then create element for it
            children: children.map(child =>
                typeof child === "object"
                    ? child
                    : createTextElement(child)
            ),
        },
    }
}

function createTextElement(text) {
    return {
        type: "TEXT_ELEMENT",
        props: {
            nodeValue: text,
            children: [],
        },
    }
}

function render(element, container) {
    // if text type create text node else continue as normal
    const dom = element.type == "TEXT_ELEMENT"
        ? document.createTextNode("") :
        document.createElement(element.type);


    // filter property (not children property)
    const isProperty = key => key !== "children";
    // .keys to get all property names
    Object.keys(element.props)
        // filter those that aren't name "children"
        .filter(isProperty)
        // for each of those set their result to doms
        .forEach(name => {
            dom[name] = element.props[name]
        })

    // render each child
    element.props.children.forEach(child =>
        render(child, dom)
    )

    container.appendChild(dom);
}

const Retaliate = {
    createElement,
    render,
}

// babel will use function
/** @jsx Retaliate.createElement */
const element = (
    <div style="background: green; display:flex; flex-direction: column; 
    justify-content: center; align-items: center; color: white">
        <h1>Hello World</h1>
        <h2 style="text-align:right">from Retaliate</h2>
    </div>
)

const container = document.getElementById("root");

Retaliate.render(element, container)


