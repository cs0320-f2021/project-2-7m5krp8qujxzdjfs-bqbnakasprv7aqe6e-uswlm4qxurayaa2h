package edu.brown.cs.student.gui;

import java.util.List;
import java.util.Map;

import com.google.common.collect.ImmutableMap;
import com.google.gson.Gson;

import edu.brown.cs.student.maps.MapsDatabase;
import edu.brown.cs.student.handlers.maps.RouteHandler;
import edu.brown.cs.student.handlers.maps.MapsHandler;
import edu.brown.cs.student.maps.NearestMap;
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
		double srcLat = data.getDouble("srclat");
		double srcLon = data.getDouble("srclong");
		double destLat = data.getDouble("destlat");
		double destLon = data.getDouble("destlong");

		String mapFilePath = "data/maps/brown.sqlite3"; //maps.sqlite3, brown.sqlite3
		MapsDatabase db = new MapsDatabase(mapFilePath);
		MapsHandler.setMapData(db);

		// get the node ids from the coodinates
		NearestMap mapfinderStart = new NearestMap(new double[] { srcLat, srcLon });
		mapfinderStart.nearestFind(MapsDatabase.getMapTree());
		String startNodeID = mapfinderStart.getBestNode().getID();
		NearestMap mapfinderEnd = new NearestMap(new double[] { destLat, destLon });
		mapfinderEnd.nearestFind(MapsDatabase.getMapTree());
		String endNodeID = mapfinderEnd.getBestNode().getID();

		List<List<Double>> route = RouteHandler.findNodeRoute(startNodeID, endNodeID);

		Map<String, List<List<Double>>> variables = ImmutableMap.of("route", route);

		return gson.toJson(variables);
	}

}
