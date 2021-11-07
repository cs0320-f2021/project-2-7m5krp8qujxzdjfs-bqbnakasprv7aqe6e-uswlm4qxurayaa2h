package main.java.edu.brown.cs.lazy;

import java.util.HashMap;
import java.util.Map;

import main.java.edu.brown.cs.graph.EdgeStorable;
import main.java.edu.brown.cs.graph.Graph;
import main.java.edu.brown.cs.graph.GraphSourceParser;
import main.java.edu.brown.cs.graph.ValuedEdge;
import main.java.edu.brown.cs.graph.ValuedVertex;
import main.java.edu.brown.cs.graph.VertexStorable;

/**
 * This is a "lazy" implementation of a main.java.edu.brown.cs.graph.graph. Edges are only loaded in when they are queried.
 *
 * @param <T> The type of Object that {@link ValuedVertex} stores
 * @param <W> The type of Object that {@link ValuedEdge} stores
 */
public class LazyGraph<T extends VertexStorable, W extends EdgeStorable> extends Graph<T, W> {
  private Map<T, ValuedVertex> lzVertices;

  /**
   * Constructs a new LazyGraph.
   *
   * @param g The data source for the LazyGraph
   */
  public LazyGraph(GraphSourceParser g) {
    super(g);
    lzVertices = new HashMap<>();
  }

  /**
   * Searches for a {@link ValuedVertex} in the Graph that contains the given value.
   *
   * @param val The valued contained in the wanted ValuedVertex
   * @return a {@link ValuedVertex}
   */
  @Override
  public ValuedVertex<T, W> getVertex(T val) {
    if (lzVertices.containsKey(val)) {
      return lzVertices.get(val);
    }
    ValuedVertex<T, W> vertex = new LazyVertex<T, W>(val, this.getGraphBuilder(), this);
    lzVertices.put(val, vertex);
    return vertex;
  }
}
