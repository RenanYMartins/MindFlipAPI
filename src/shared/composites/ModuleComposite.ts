import { Router } from "express";

export interface RouteHandler {
    method: 'get' | 'post' | 'put' | 'delete';
    path: string;
    handlerName: string;
}

export class RouteNode {
    constructor(
        public basePath: string,
        public controller: object,
        public handlers: RouteHandler[] = [],
        public children: RouteNode[] = []
    ) { }

    addChild(node: RouteNode) {
        this.children.push(node);
    }
}