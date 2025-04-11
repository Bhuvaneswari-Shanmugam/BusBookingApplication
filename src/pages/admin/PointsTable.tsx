import React from 'react';
import Label from "../../components/Label";
import Button from '../../components/Button';
import Input from "../../components/Input";
import { PointsTableProps } from "../../utils/entity/AdminInterface";
import { colors } from '../../constants/Palette';
import { FaPlus, FaTrash, FaEdit } from 'react-icons/fa';

const PointsTable: React.FC<PointsTableProps> = ({ points, onAddPoint, onRemovePoint, onChange }) => {
    return (
        <div style={{ position: 'relative' }}>
            <div>
                <div className="points-list">
                    {points.map((item, index) => (
                        <div key={index} className="point-item" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px', padding: '10px', border: '1px dotted rgb(90, 23, 234)', borderRadius: '4px', backgroundColor: index % 2 === 0 ? '#f8f9fa' : '#ffffff' }}>
                            <div className="point-details" style={{ display: 'flex', alignItems: 'center' }}>
                                <Input
                                    type="text"
                                    value={item.location}
                                    onChange={(e) => onChange(index, 'location', e.target.value)}
                                    placeholder="Enter location"
                                    style={{
                                        width: '200px',
                                        padding: '5px',
                                        border: '1px solid #ced4da',
                                        borderRadius: '4px',
                                        marginRight: '10px'
                                    }}
                                />
                                <Input
                                    type="time"
                                    value={item.time}
                                    onChange={(e) => onChange(index, 'time', e.target.value)}
                                    placeholder="Enter time"
                                    style={{
                                        width: '100px',
                                        padding: '5px',
                                        border: '1px solid #ced4da',
                                        borderRadius: '4px',
                                    }}
                                />
                            </div>
                            {
                                index> 0  && <FaTrash
                                onClick={() => onRemovePoint(index)}
                                style={{
                                    color: colors.danger,
                                    cursor: 'pointer',
                                    fontSize: '20px',
                                }}
                            />
                            }
                            
                            
                        </div>
                    ))}
                    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
                        <FaPlus
                            className="add-point-icon"
                            onClick={onAddPoint}
                            style={{ color: colors.pagecolor, cursor: 'pointer', fontSize: '20px' }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PointsTable;
