package com.ilchinjo.mainproject.domain.address.repository;

import com.ilchinjo.mainproject.domain.address.entity.Address;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface AddressRepository extends JpaRepository<Address, Long> {
    @Query("select a1 " +
            "from Address a1 " +
            "where a1.addressId = (select min(a2.addressId) from Address a2 where a1.sigungu = a2.sigungu) " +
            "order by a1.sigungu")
    List<Address> findAllAddressDistinct();
}
