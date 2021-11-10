package edu.brown.cs.student.maps;

import static org.junit.Assert.assertEquals;

import org.junit.Before;
import org.junit.Test;

import edu.brown.cs.student.handlers.maps.MapsHandler;
import edu.brown.cs.student.handlers.maps.WaysHandler;
import edu.brown.cs.student.main.ParseCommands;

/**
 * Tests for WaysHandler to ensure that we are correctly handling the ways
 * command.
 *
 */
public class WaysHandlerTest {

  @Before
  public void setUp() {
    ParseCommands.setInputLine("map data/maps/smallMaps.sqlite3"); // original smallMaps
    MapsHandler handler = new MapsHandler();
    handler.handle();
  }

  @Test
  public void noWays() {
    setUp();
    ParseCommands.setInputLine("ways 3 0 1 1");
    WaysHandler handler = new WaysHandler();
    handler.handle();
    assertEquals(System.lineSeparator(), ParseCommands.getOutputString());
  }

  @Test
  public void allWays() {
    setUp();
    ParseCommands.setInputLine("ways 42 -72 41.8 -71.3");
    WaysHandler handler = new WaysHandler();
    handler.handle();
    assertEquals("/w/0" + System.lineSeparator() + "/w/1"
        + System.lineSeparator() + "/w/2" + System.lineSeparator() + "/w/3"
        + System.lineSeparator() + "/w/4" + System.lineSeparator() + "/w/5"
        + System.lineSeparator() + "/w/6" + System.lineSeparator(),
        ParseCommands.getOutputString());
  }

  @Test
  public void someWays() {
    setUp();
    ParseCommands.setInputLine("ways 41.8206 -71.4003 41.8204 -71.4002");
    WaysHandler handler = new WaysHandler();
    handler.handle();
    assertEquals(
        "/w/4" + System.lineSeparator() + "/w/6" + System.lineSeparator(),
        ParseCommands.getOutputString());
  }

//  @Test
//  public void someWays2() {
//    // WARNING THIS TEST MIGHT BE WRONG
//    // looking at just /n/0|41.82|-71.4
//    setUp();
//    ParseCommands.setInputLine("ways 41.8200001 -71.40000001 41.8199999 -71.39999999"); //ways 41.8210 -71.4100 41.8190 -71.3990
//    WaysHandler handler = new WaysHandler();
//    handler.handle();
//    assertEquals(
//        "/w/0" + System.lineSeparator() + "/w/2" + System.lineSeparator(),
//        ParseCommands.getOutputString());
//  }
//
//  @Test
//  public void someWays3() {
//    // WARNING THIS TEST MIGHT BE WRONG
//    // looking at just /n/5|41.8206|-71.4003
//    setUp();
//    ParseCommands.setInputLine("ways 41.82060001 -71.4003000001 41.820599999 -71.40029999999"); //ways 41.8210 -71.4100 41.8190 -71.3990
//    WaysHandler handler = new WaysHandler();
//    handler.handle();
//    assertEquals(
//        System.lineSeparator(),
//        ParseCommands.getOutputString());
//  }

  @Test
  public void waysBadData() {
    setUp();
    ParseCommands.setInputLine("ways 41 obama 1 3");
    WaysHandler handler = new WaysHandler();
    handler.handle();
    assertEquals("ERROR: Invalid data formats." + System.lineSeparator(),
        ParseCommands.getOutputString());
  }

  @Test
  public void waysBadArgs() {
    setUp();
    ParseCommands.setInputLine("ways 41 1 3 1 3");
    WaysHandler handler = new WaysHandler();
    handler.handle();
    assertEquals("ERROR: Invalid number of arguments." + System.lineSeparator(),
        ParseCommands.getOutputString());
  }

  @Test
  public void waysNoMap() {
    MapsHandler.setMapData(null);
    ParseCommands.setInputLine("ways 41.8206 -71.4003 41.8204 -71.4002");
    WaysHandler handler = new WaysHandler();
    handler.handle();
    assertEquals("ERROR: No map uploaded." + System.lineSeparator(),
        ParseCommands.getOutputString());
  }
}
