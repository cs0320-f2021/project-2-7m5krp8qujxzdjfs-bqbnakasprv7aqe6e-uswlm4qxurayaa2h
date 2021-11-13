package edu.brown.cs.student.gui;

import java.util.List;
import java.util.Map;

import com.google.common.collect.ImmutableMap;
import com.google.gson.Gson;

import edu.brown.cs.student.maps.MapsDatabase;
import org.json.JSONObject;
import spark.Request;
import spark.Response;
import spark.Route;

/**
 * Route GUI
 *
 */
public class RouteGUI implements Route {

	@Override
	public String handle(Request request, Response response) throws Exception {
		Gson gson = new Gson();
		JSONObject data = new JSONObject(request.body());
		double srcLat = data.getDouble("srcelat");
		double srcLon = data.getDouble("srclong");
		double destLat = data.getDouble("destlat");
		double destlong = data.getDouble("destlong");

		MapsDatabase db = new MapsDatabase("data/maps/smallMaps.sqlite3");

		RouteHandler rh = new RouteHandler();
		List<List<Double>> route = rh.findNodeRoute("n/0/", "n/1/");

		// what if we store each way as a Way object with id, lat, and lon
		// getWays returns a lst = List<Way>
		// and then ImmutableMap.of("ways", lst)
		Map<String, List<List<String>>> variables = ImmutableMap.of("route", route);

		return gson.toJson(variables);
	}

}
