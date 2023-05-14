package com.newhorizons.employee.domain;


import com.fasterxml.jackson.databind.PropertyNamingStrategy;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;
import lombok.experimental.SuperBuilder;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.Objects;

@MappedSuperclass
@JsonNaming(PropertyNamingStrategy.SnakeCaseStrategy.class)
@ToString
@SuperBuilder
@Getter
@NoArgsConstructor
@AllArgsConstructor
public abstract class PersistableEntity<T> {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private T id;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

    @PrePersist
    public void prePersist() {
        createdAt = LocalDateTime.now();
        updatedAt = createdAt;
    }

    @PreUpdate
    public void preUpdate() {
        updatedAt = LocalDateTime.now();
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        PersistableEntity<?> that = (PersistableEntity<?>) o;
        return Objects.equals(id, that.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
}
