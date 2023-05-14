package com.newhorizons.product.controller;

import com.newhorizons.product.domain.Product;
import com.newhorizons.product.domain.dto.ProductDto;
import com.newhorizons.product.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/new-horizons/services/products")
public class ProductController {

    private ProductService productService;

    @Autowired
    public ProductController(ProductService productService){
        this.productService = productService;
    }

    @PostMapping(value = "")
    public Product saveProduct(@RequestBody ProductDto product){
        return productService.saveProduct(product);
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<Product> getProduct(@PathVariable("id") Long id) {
        return productService.getProduct(id);
    }

    @GetMapping(value = "")
    public ResponseEntity<List<Product>> getProduct() {
        return productService.getProducts();
    }

    @PutMapping(value = "/{id}")
    public Product updateProduct(@RequestBody ProductDto product, @PathVariable("id") Long id){
        return productService.updateProduct(product, id);
    }

    @DeleteMapping(value = "/{id}")
    public Product deleteProduct(@PathVariable("id") Long id){
        return productService.deleteProduct(id);
    }

}


