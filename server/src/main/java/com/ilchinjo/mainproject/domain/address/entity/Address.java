package com.ilchinjo.mainproject.domain.address.entity;

import com.ilchinjo.mainproject.global.audit.AuditingEntity;
import lombok.*;
import org.locationtech.jts.geom.MultiPolygon;
import org.locationtech.jts.geom.Point;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
@Table(
        uniqueConstraints = {
                @UniqueConstraint(name = "NoSameName", columnNames = {"sido", "sigungu", "eupmyeondong"})
        },
        indexes = {
                @Index(name = "sigunguIndex", columnList = "sigungu")
        }
)
public class Address extends AuditingEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long addressId;

    private String sido;

    private String sigungu;

    private String eupmyeondong;

    private Point centerPoint;

    private MultiPolygon multiPolygon;
}
