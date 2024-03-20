import { VerticalLayout } from "@vaadin/react-components/VerticalLayout.js";

/**
 * Hilla view that is available publicly.
 */
export default function Public() {
    return (
        <VerticalLayout theme="padding">
            <p>This is a Hilla view available publicly.</p>
        </VerticalLayout>
    );
}