package com.newhorizons.product.service;

import com.newhorizons.product.domain.Product;
import com.newhorizons.product.domain.dto.ProductDto;
import com.newhorizons.product.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductService {

    private ProductRepository productRepository;

    @Autowired
    public ProductService(ProductRepository productRepository){
        this.productRepository = productRepository;
    }
    
    public Product saveProduct(ProductDto productDto){
        Product productModel = new Product();
        setProductModel(productDto, productModel);

        return productRepository.save(productModel);
    }

    public void setProductModel(ProductDto productDto, Product productModel) {
        productModel.setName(productDto.getName());
        productModel.setEdition(productDto.getEdition());
        productModel.setCode(productDto.getCode());
        productModel.setTheoretical_hours(productDto.getTheoretical_hours());
        productModel.setPractical_hours(productDto.getPractical_hours());
        productModel.setType(productDto.getType());
        productModel.setMode(productDto.getMode());
        productModel.setPrice(productDto.getPrice());
        productModel.setStatus(productDto.getStatus());
        productModel.setAvailable(productDto.getAvailable());
    }

    public ResponseEntity<Product> getProduct(Long id){
        Optional<Product> productData = productRepository.findById(id);

        if (productData.isPresent()) {
            return new ResponseEntity<>(productData.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    public ResponseEntity<List<Product>> getProducts() {
        List<Product> productsData = productRepository.findAll();
        return new ResponseEntity<>(productsData, HttpStatus.OK);
    }

    public Product updateProduct(ProductDto productDto, Long id) {
        Product productToUpdate = productRepository.getOne(id);
        setProductModel(productDto, productToUpdate);
        return productRepository.save(productToUpdate);
    }

    public Product deleteProduct(Long id) {
        Product productToDelete = productRepository.getOne(id);
        productToDelete.setAvailable(Boolean.FALSE);
        return productRepository.save(productToDelete);
    }

}
