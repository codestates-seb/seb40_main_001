package com.ilchinjo.around.domain.address.repository;

import com.ilchinjo.around.domain.address.entity.Address;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AddressRepository extends JpaRepository<Address, Long> {
}
