package main.java.edu.brown.cs.gui;

import java.util.Map;

import com.google.common.collect.ImmutableMap;
import com.google.gson.Gson;

import spark.Request;
import spark.Response;
import spark.Route;

/**
 * Sample nearest GUI
 *
 */
public class NearestGUI implements Route {

	@Override
	public String handle(Request request, Response response) throws Exception {
		Gson gson = new Gson();
		Map<String, String> variables = ImmutableMap.of("node", "/n/0");
		return gson.toJson(variables);
	}

}
