package fr.yuzutech.riemann.mission.control;

import io.vertx.core.Vertx;
import io.vertx.core.http.HttpHeaders;
import io.vertx.core.http.HttpServer;
import io.vertx.ext.web.Router;
import io.vertx.ext.web.handler.StaticHandler;
import io.vertx.ext.web.templ.HandlebarsTemplateEngine;
import io.vertx.ext.web.templ.TemplateEngine;

public class Main {

  public static void main(String[] args) {
    Vertx vertx = Vertx.vertx();
    HttpServer server = vertx.createHttpServer();

    TemplateEngine engine = HandlebarsTemplateEngine.create();
    TemplateHandler templateHandler = TemplateHandler.create(engine);
    Router router = Router.router(vertx);
    router.route("/static/*").handler(StaticHandler.create());

    router.get("/").handler(context -> templateHandler.handle(context, "/index.hbs"));
    router.get("/rules/add").handler(context -> templateHandler.handle(context, "/rules/add.hbs"));
    server.requestHandler(router::accept).listen(8080);
  }
}
