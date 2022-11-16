package com.ilchinjo.mainproject.domain.address.repository;

import com.ilchinjo.mainproject.domain.address.entity.Address;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AddressRepository extends JpaRepository<Address, Long> {
}
