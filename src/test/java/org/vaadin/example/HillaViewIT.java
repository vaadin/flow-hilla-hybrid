package org.vaadin.example;

public class HillaViewIT extends FlowViewIT {
    @Override
    protected String getPath() {
        return "/hilla";
    }

    @Override
    protected void login() {
        login("user", "user");
    }

}
