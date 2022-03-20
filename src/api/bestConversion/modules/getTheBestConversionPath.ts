import { CurrencyRate, CurrencyRateAGraph, DefaultCurrency } from "../types";

/**
 * In this shortest path search function, the search is performed from the final node to the initial one, 
 * the strategy is that in an interactive way, 
 * the neighbors are looked at and the smallest weight is identified, 
 * and each advance in the graph this step is stacked
 */
export const findForShortestConvertionPath = (firstCurrency: string, lastCurrency: string, currencyRateGraph: CurrencyRateAGraph): string[] => {
    //the search starts with the final currency
    let nextCurrency: string = lastCurrency;
    const arrayWithCurrency: string[] = [];

    // the interaction does not end until the node is the initial one
    while (nextCurrency !== firstCurrency) {
        let minWeigth: number = Number.MAX_VALUE;
        let minCurrency: string = "";
        /**
         * for each neighboring node it is checked what is the lowest weight 
         * and it will become the next hop
         */
        for (let i of currencyRateGraph[nextCurrency].nodes) {
            if (currencyRateGraph[i.toCurrencyCode].weight < minWeigth) {
                minWeigth = currencyRateGraph[i.toCurrencyCode].weight;
                minCurrency = i.toCurrencyCode;
            }
        }
        arrayWithCurrency.push(minCurrency);
        nextCurrency = minCurrency;
    }

    /**
     * as the search is performed from the end to the beginning, 
     * it is necessary to invert the list and insert the end since it was our initial
     */
    arrayWithCurrency.reverse().push(lastCurrency);
    return arrayWithCurrency;
}
/**
 * This is the function responsible for creating the graph, 
 * but as we mentioned we are using the dijkstra strategy, 
 * where we will already create the graph with the weight of the first node 0 (zero) and 
 * the others infinity, another important detail is that our problem of conversion is a directed graph, 
 * because the conversion values in the opposite direction are different, 
 * for example: 1 CAD -> 3.99 BRL != 1 BRL -> 0.25 CAD , 
 * so we follow the strategy that the opposite nodes will have infinite weight, 
 * thus making the our directed graph
 */
export const buildCurrencyRateGraph = (firstCurrency: string, currencyRateList: CurrencyRate[]): CurrencyRateAGraph => {
    /**
     * We iterate over the list of conversions, and create a list of adjacencies, 
     * where the initial node will have zero weight and the others infinite, 
     * in addition we create for each node created with a direction, 
     * we create in the list an opposite node with infinite weight
     */
    return currencyRateList.reduce((acc, cur) => {
        if (acc[cur.fromCurrencyCode]) {
            const nodesFrom = [...acc[cur.fromCurrencyCode].nodes, cur]
            if (acc[cur.toCurrencyCode]) {
                const nodesTo = [...acc[cur.toCurrencyCode].nodes, {
                    exchangeRate: Number.MIN_VALUE,
                    fromCurrencyCode: cur.toCurrencyCode,
                    fromCurrencyName: cur.toCurrencyName,
                    toCurrencyCode: cur.fromCurrencyCode,
                    toCurrencyName: cur.fromCurrencyName
                }]
                return {
                    ...acc,
                    [cur.fromCurrencyCode]: {
                        ...acc[cur.fromCurrencyCode],
                        nodes: nodesFrom,
                        weight: cur.fromCurrencyCode === firstCurrency ? 0 : Number.MAX_VALUE
                    },
                    [cur.toCurrencyCode]: {
                        ...acc[cur.toCurrencyCode],
                        nodes: nodesTo,
                        weight: cur.fromCurrencyCode === firstCurrency ? 0 : Number.MAX_VALUE
                    }
                }
            }

            return {
                ...acc,
                [cur.fromCurrencyCode]: {
                    ...acc[cur.fromCurrencyCode],
                    nodes: nodesFrom,
                    weight: cur.fromCurrencyCode === firstCurrency ? 0 : Number.MAX_VALUE
                },
                [cur.toCurrencyCode]: {
                    name: cur.toCurrencyCode,
                    nodes: [{
                        exchangeRate: Number.MIN_VALUE,
                        fromCurrencyCode: cur.toCurrencyCode,
                        fromCurrencyName: cur.toCurrencyName,
                        toCurrencyCode: cur.fromCurrencyCode,
                        toCurrencyName: cur.fromCurrencyName
                    }],
                    weight: cur.fromCurrencyCode === firstCurrency ? 0 : Number.MAX_VALUE
                }
            }
        }

        return {
            ...acc,
            [cur.fromCurrencyCode]: {
                name: cur.fromCurrencyCode,
                nodes: [cur],
                weight: cur.fromCurrencyCode === firstCurrency ? 0 : Number.MAX_VALUE
            },
            [cur.toCurrencyCode]: {
                name: cur.toCurrencyCode,
                nodes: [{
                    exchangeRate: Number.MAX_VALUE,
                    fromCurrencyCode: cur.toCurrencyCode,
                    fromCurrencyName: cur.toCurrencyName,
                    toCurrencyCode: cur.fromCurrencyCode,
                    toCurrencyName: cur.fromCurrencyName
                }],
                weight: cur.fromCurrencyCode === firstCurrency ? 0 : Number.MAX_VALUE
            }
        }

    }, {} as CurrencyRateAGraph);

}

/**
 * This is the weight updates function, which after creating the graph, 
 * we have to update the weights and for that we will use the conversion rates, 
 * where we walk looking at the neighbors, updating their weights and following the lowest weight
 */
export const updateCurrencyRateGraphWeights = (currencyRateInitialGraph: CurrencyRateAGraph): CurrencyRateAGraph => {
    const currecies = {} as { [T: string]: number };
    /**
     * We start the function with an object that contains all the coins and their weights, 
     * and it will be responsible for containing the unvisited nodes
     */
    for (let i in currencyRateInitialGraph) {
        currecies[currencyRateInitialGraph[i].name] = currencyRateInitialGraph[i].weight;
    }

    /**
     * The interaction continues until all nodes are visited.
     */
    while (Object.keys(currecies).length !== 0) {
        /**
         * Each interaction is sorted by weight, so that the nodes with the lowest weight are visited first, 
         * as we know in the first interaction the source node starts because it has weight 0 (zero)
         */
        const sortedVisitedByWeight: string[] = Object.keys(currecies).sort((a, b) => currencyRateInitialGraph[a].weight - currencyRateInitialGraph[b].weight);
        const currentCurrency = currencyRateInitialGraph[sortedVisitedByWeight[0]];

        /**
         * An interaction is made in the neighbors of the current node, 
         * where the weights are updated and so going up to the last node.
         */
        for (let j of currentCurrency.nodes) {
            const calculateWeight: number = currentCurrency.weight + j.exchangeRate;
            if (calculateWeight < currencyRateInitialGraph[j.toCurrencyCode].weight) {
                currencyRateInitialGraph[j.toCurrencyCode].weight = calculateWeight;
            }
        }
        delete currecies[sortedVisitedByWeight[0]];
    }

    return currencyRateInitialGraph;
}

/**
 * This is the function that performs the search for the best conversion path, 
 * the logic used in it was that of the djikstra algorithm, 
 * which aims to search for the optimal path, thus passing through the initial assembly of the graph, 
 * the walk through the graph to update the weights and finally, 
 * the search for the optimal path between the start and end nodes
 */
export const getTheBestConversionPath = (firstCurrency: string, lastCurrency: string, currencyRateList: CurrencyRate[]): string[] => {

    /**
     * This condition is for the condition of initial and final states to be equal
     */
    if (firstCurrency === lastCurrency) return [DefaultCurrency.Code as string];

    /**
     * This is the function responsible for creating the graph from the list of conversions, 
     * where this graph will already be created with the initial conditions for dijkstra
     */
    const currencyRateInitialGraph: CurrencyRateAGraph = buildCurrencyRateGraph(firstCurrency, currencyRateList);

    /**
     * This function will perform the walk through the graph and update the weights
     */
    const currencyRateGraphAfterUpdateWeight: CurrencyRateAGraph = updateCurrencyRateGraphWeights(currencyRateInitialGraph)

    /**
     * this function will search for the best way to update the weights of each conversion
     */
    const bestPath: string[] = findForShortestConvertionPath(firstCurrency, lastCurrency, currencyRateGraphAfterUpdateWeight);

    return bestPath;
}



