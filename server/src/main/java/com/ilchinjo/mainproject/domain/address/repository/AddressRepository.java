package com.ilchinjo.mainproject.domain.address.repository;

import com.ilchinjo.mainproject.domain.address.entity.Address;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface AddressRepository extends JpaRepository<Address, Long> {
    @Query("select a1 " +
            "from Address a1 " +
            "where a1.addressId = (select min(a2.addressId) from Address a2 where a1.sigungu = a2.sigungu) " +
            "order by a1.sigungu")
    List<Address> findAllAddressDistinct();

    @Query(value = "select *\n" +
            "from address\n" +
            "where ST_INTERSECTS(multi_polygon, ST_BUFFER(\n" +
            "    (select center_point \n" +
            "     from address \n" +
            "     where address_id = :addressId), 2000))",
            nativeQuery = true)
    List<Address> findNearbyAddresses(@Param("addressId") Long addressId);

}
