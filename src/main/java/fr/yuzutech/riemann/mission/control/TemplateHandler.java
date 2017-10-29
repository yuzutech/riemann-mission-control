package fr.yuzutech.riemann.mission.control;

import io.vertx.core.http.HttpHeaders;
import io.vertx.ext.web.RoutingContext;
import io.vertx.ext.web.templ.TemplateEngine;

public class TemplateHandler {

  private final TemplateEngine engine;

  public static TemplateHandler create(TemplateEngine engine) {
    return new TemplateHandler(engine);
  }

  private TemplateHandler(TemplateEngine engine) {
    this.engine = engine;
  }

  public void handle(RoutingContext context, String templateFileName) {
    engine.render(context, io.vertx.ext.web.handler.TemplateHandler.DEFAULT_TEMPLATE_DIRECTORY, templateFileName, res -> {
      if (res.succeeded()) {
        context.response().putHeader(HttpHeaders.CONTENT_TYPE, io.vertx.ext.web.handler.TemplateHandler.DEFAULT_CONTENT_TYPE).end(res.result());
      } else {
        context.fail(res.cause());
      }
    });
  }
}
