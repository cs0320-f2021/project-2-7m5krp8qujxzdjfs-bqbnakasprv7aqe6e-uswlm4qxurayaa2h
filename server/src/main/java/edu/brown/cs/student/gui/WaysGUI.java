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
 * Ways GUI
 *
 */
public class WaysGUI implements Route {

	@Override
	public String handle(Request request, Response response) throws Exception {
		Gson gson = new Gson();
		JSONObject data = new JSONObject(request.body());
		double lat1 = data.getDouble("lat1");
		double lon1 = data.getDouble("lon1");
		double lat2 = data.getDouble("lat2");
		double lon2 = data.getDouble("lon2");

		MapsDatabase db = new MapsDatabase("data/maps/modifiedSmallMaps.sqlite3");
		System.out.println("asdf"+db.getTraversableWays().toString());

		List<String> ways = db.getWays(lat1, lon1, lat2, lon2);

		// what if we store each way as a Way object with id, lat, and lon
		// getWays returns a lst = List<Way>
		// and then ImmutableMap.of("ways", lst)


		Map<String, Object> variables = ImmutableMap.of("ways", ways);

		return gson.toJson(variables);
	}

}
