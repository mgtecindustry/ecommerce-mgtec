"use client";

import { getAllProducts } from "@/sanity/lib/products/getAllProducts";
import { getProductsByCategory } from "@/sanity/lib/products/getProductsByCategory";
import { Product } from "@/sanity.types";
import { useState, useEffect } from "react";
